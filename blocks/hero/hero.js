import '@udex/webcomponents/dist/HeroBanner.js';
import '@udex/webcomponents/dist/Button.js';
import '@udex/webcomponents/dist/Avatar.js';
import { div, span, p } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import { formatDate } from '../../scripts/utils.js';

function calculateInitials(name) {
  const nameParts = name.split(' ');
  let initials = '';
  nameParts.forEach((part) => {
    initials += part.charAt(0).toUpperCase();
  });
  return initials;
}

function decorateMetaInfo() {
  const infoBlockWrapper = div({ class: 'media-blend__info-block' });

  if (getMetadata('author')) {
    const avatar = document.createElement('udex-avatar');
    avatar.setAttribute('size', 'XS');
    avatar.setAttribute('initials', calculateInitials(getMetadata('author')));
    avatar.setAttribute('color-scheme', 'Neutral');

    const author = span({ class: 'media-blend__author' }, getMetadata('author'));
    infoBlockWrapper.append(avatar, author);
  }
  const lastUpdate = getMetadata('modified-time')
    ? getMetadata('modified-time')
    : getMetadata('published-time');
  infoBlockWrapper.append(
    span({ class: 'media-blend__date' }, `Updated on ${formatDate(lastUpdate)}`),
  );

  if (getMetadata('twitter:data2')) {
    infoBlockWrapper.append(
      span({ class: 'media-blend__read-time' }, getMetadata('twitter:data2')),
    );
  }

  return infoBlockWrapper;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const hero = document.createElement('udex-hero-banner');
  const intro = block.querySelector('h6');
  const heading = block.querySelector('h1');
  const contentSlot = div(
    {
      slot: 'content',
      class: ['hero-banner', 'media-blend__content'],
    },
    intro ? p({ class: 'media-blend__intro-text' }, block.querySelector('h6')?.textContent) : '',
    heading,
  );
  hero.append(contentSlot);

  // get images for background
  let picture = block.querySelector(':scope div > div > picture');
  if (picture) {
    picture.setAttribute('slot', 'backgroundPicture');
    const img = picture.querySelector('img');
    img.classList.add('custom-background-image');
    hero.append(picture);
  }
  picture = block.querySelector(':scope div > div picture');
  if (picture) {
    const additionalContentSlot = div(
      {
        slot: 'additionalContent',
        class: ['hero-banner', 'media-blend__additional-content'],
      },
      picture,
    );
    hero.append(additionalContentSlot);
  }

  // clean up the block before we get the description
  intro?.remove();
  block.querySelectorAll('p').forEach((pEl) => {
    if (!pEl.textContent.trim()) {
      pEl.remove();
    }
  });

  // convert all buttons to udex-buttons
  const buttonContainer = div({ class: 'media-blend__buttons' });
  block.querySelectorAll('p.button-container a').forEach((a) => {
    const button = document.createElement('udex-button');
    if (a.parentElement.nodeName === 'STRONG') button.design = 'Primary';
    if (a.parentElement.nodeName === 'EM') button.design = 'Secondary';
    button.textContent = a.textContent;

    button.addEventListener('click', () => {
      window.location.href = a.href;
    });

    buttonContainer.appendChild(button);
    a.closest('p').remove();
  });
  if (block.querySelector(':scope div > div').childElementCount > 0) contentSlot.append(...block.querySelector(':scope div > div').children);

  contentSlot.append(decorateMetaInfo());

  if (buttonContainer.childElementCount > 0) contentSlot.append(buttonContainer);

  block.replaceWith(hero);
}
