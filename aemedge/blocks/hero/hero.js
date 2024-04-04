import '@udex/webcomponents/dist/HeroBanner.js';
import {
  a, div, p, span,
} from '../../scripts/dom-builder.js';
import {
  fetchPlaceholders, getMetadata, toCamelCase, toClassName,
} from '../../scripts/aem.js';
import { formatDate } from '../../scripts/utils.js';
import Tag from '../../libs/tag/tag.js';
import { buildAuthorUrl, getAuthorEntries, getAuthorNames } from '../../scripts/article.js';
import Avatar from '../../libs/avatar/avatar.js';

function calculateInitials(name) {
  const nameParts = name.split(' ');
  let initials = '';
  nameParts.forEach((part) => {
    initials += part.charAt(0).toUpperCase();
  });
  return initials;
}

function buildAuthorEl(author) {
  return a({ class: 'media-blend__author', href: buildAuthorUrl(author) }, author);
}

function addAuthorAvatarImg(authorName, avatar) {
  return getAuthorEntries([authorName]).then((authorEntries) => {
    if (authorEntries && authorEntries.length > 0) {
      const ae = authorEntries[0];
      const picture = new Avatar(ae.author, ae.title, ae.description, ae.path, ae.image).getImage();
      avatar.append(picture.querySelector('img')); /* default slot */
    }
  });
}

function decorateMetaInfo() {
  const infoBlockWrapper = span({ class: 'media-blend__info-block' });

  const authorNames = getAuthorNames();
  const authorEl = span({ class: 'media-blend__authors' });
  if (authorNames.length > 0) {
    if (authorNames.length === 1 && !!authorNames[0]) {
      const avatar = document.createElement('udex-avatar');
      avatar.setAttribute('size', 'XS');
      avatar.setAttribute('initials', calculateInitials(authorNames[0]));
      avatar.setAttribute('color-scheme', 'Neutral');
      addAuthorAvatarImg(authorNames[0], avatar);
      infoBlockWrapper.append(avatar);
      authorEl.append(buildAuthorEl(authorNames[0]));
    } else {
      authorNames.forEach((author) => {
        if (author) {
          authorEl.append(buildAuthorEl(author));
        }
      });
    }
  }

  if (authorEl.children.length > 0) {
    infoBlockWrapper.append(authorEl);
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

function replacePlaceholderText(elem, placeholder) {
  if (elem && (elem.innerText.includes('[page]') || elem.innerText.includes('[author]'))) {
    const adaptedPath = toCamelCase(window.location.pathname
      .replace('tags', 'tag').replace('topics', 'topic').substring(1));
    elem.innerHTML = elem.innerHTML.replace('[page]', placeholder[adaptedPath] ? placeholder[adaptedPath] : '');
    elem.innerHTML = elem.innerHTML.replace('[author]', getMetadata('author') || '');
  }
  return elem;
}

function buildEyebrow(content) {
  return p(
    { class: 'media-blend__intro-text' },
    content,
  );
}

/**
 * loads and decorates the hero
 * @param {Element} block The hero block element
 */
export default async function decorate(block) {
  const isArticle = getMetadata('template') === 'article';
  const isMediaBlend = isArticle || block.classList.contains('media-blend');
  const placeholder = await fetchPlaceholders();

  // extract block content
  const hero = document.createElement('udex-hero-banner');
  const heading = block.querySelector('h1');
  const eyebrow = block.querySelector('h6');
  let eyebrowText = eyebrow?.textContent;
  const contentType = getMetadata('content-type').split(',')[0].trim();

  if (!eyebrowText && isArticle) {
    // if no eyebrow text is set, use the content type for articles
    const placeholderText = placeholder[toCamelCase(`content-type/${contentType}`)];
    eyebrowText = placeholderText || contentType.replace('-', ' ');
  }

  const eyebrowArrow = span({ class: 'eyebrow-arrow' });
  let newEyebrow = '';
  if (eyebrow?.firstElementChild?.tagName.toLowerCase() === 'a') {
    // If author has added a custom link, add arrow and appropriate classes for styling
    const content = eyebrow.firstElementChild;
    content.insertBefore(eyebrowArrow, content.firstChild);
    newEyebrow = buildEyebrow(content);
  } else if (eyebrowText && isArticle) {
    // If article, add link to parent topics page, and add arrow and appropriate classes for styling
    newEyebrow = buildEyebrow(a({ href: `/topics/${toClassName(contentType)}` }, eyebrowArrow, eyebrowText));
  } else if (eyebrowText) {
    // Else display simple span or nothing
    newEyebrow = buildEyebrow(eyebrowText);
  }

  const contentSlot = div(
    {
      slot: 'content',
      class: ['hero-banner', 'media-blend__content'],
    },
    newEyebrow,
    replacePlaceholderText(heading, placeholder),
  );
  hero.append(contentSlot);

  // get images for background
  let picture = block.querySelector(':scope div > div > picture');
  if (picture) {
    if (block.classList.contains('full-background-image')) {
      picture.querySelectorAll('source[type="image/webp"]').forEach((source) => {
        source.srcset = source.srcset.replaceAll('format=webply', 'format=webpll');
      });
    }
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
  eyebrow?.remove();
  block.querySelectorAll('p').forEach((pEl) => {
    if (!pEl.textContent.trim()) {
      pEl.remove();
    }
  });

  // Add Primary tag
  const tagContainer = div({ class: 'media-blend__tags' });
  const firstTagText = getMetadata('topic').split(',')[0].trim();
  if (firstTagText) {
    tagContainer.append(new Tag(firstTagText, placeholder).render());
  }

  // convert all buttons to udex-buttons
  const buttonContainer = div({ class: 'media-blend__buttons' });
  block.querySelectorAll('p.button-container a').forEach((anchor) => {
    const button = document.createElement('udex-button');
    if (anchor.parentElement.nodeName === 'STRONG') button.design = 'Primary';
    if (anchor.parentElement.nodeName === 'EM') button.design = 'Secondary';
    button.textContent = anchor.textContent;

    button.addEventListener('click', () => {
      window.location.href = anchor.href;
    });

    buttonContainer.appendChild(button);
    anchor.closest('p').remove();
  });
  if (block.querySelector(':scope div > div').childElementCount > 0) contentSlot.append(...block.querySelector(':scope div > div').children);

  if (isMediaBlend) {
    if (getMetadata('author')) {
      await import('@udex/webcomponents/dist/Avatar.js');
    }
    contentSlot.append(decorateMetaInfo());
  }

  if (tagContainer.children.length > 0) {
    contentSlot.append(tagContainer);
  }

  if (buttonContainer.childElementCount > 0) {
    await import('@udex/webcomponents/dist/Button.js');
    contentSlot.append(buttonContainer);
  }

  block.replaceWith(hero);
}
