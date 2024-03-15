import '@udex/webcomponents/dist/HeroBanner.js';
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

  const author = getMetadata('author');
  if (author) {
    const avatar = document.createElement('udex-avatar');
    avatar.setAttribute('size', 'XS');
    avatar.setAttribute('initials', calculateInitials(author));
    avatar.setAttribute('color-scheme', 'Neutral');

    const authorEl = span({ class: 'media-blend__author' }, author);
    infoBlockWrapper.append(avatar, authorEl);
  }
  const lastUpdate = getMetadata('modified-time')
    ? getMetadata('modified-time')
    : getMetadata('published-time');
  if (lastUpdate) {
    const lastUpdatePrefix = (window.location.pathname.startsWith('/news/')) ? 'Published on' : 'Updated on';
    infoBlockWrapper.append(
      span({ class: 'media-blend__date' }, `${lastUpdatePrefix} ${formatDate(lastUpdate)}`),
    );
  }

  const readingTime = getMetadata('twitter:data2');
  if (readingTime) {
    infoBlockWrapper.append(
      span({ class: 'media-blend__read-time' }, readingTime),
    );
  }

  return infoBlockWrapper;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const isMediaBlend = block.classList.contains('media-blend') || getMetadata('template') === 'article';
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

  if (isMediaBlend) {
    if (getMetadata('author')) {
      await import('@udex/webcomponents/dist/Avatar.js');
    }
    contentSlot.append(decorateMetaInfo());
  }

  if (buttonContainer.childElementCount > 0) {
    await import('@udex/webcomponents/dist/Button.js');
    contentSlot.append(buttonContainer);
  }

  block.replaceWith(hero);
}
