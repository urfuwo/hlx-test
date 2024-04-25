import '@udex/webcomponents/dist/HeroBanner.js';
import {
  a, div, p, span,
} from '../../scripts/dom-builder.js';
import { getMetadata, toCamelCase } from '../../scripts/aem.js';
import { fetchTagList, formatDate, getContentType } from '../../scripts/utils.js';
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

function addAuthorAvatarImage(authorName, avatar) {
  return getAuthorEntries([authorName]).then((authorEntries) => {
    if (authorEntries && authorEntries.length > 0) {
      const picture = Avatar.fromAuthorEntry(authorEntries[0]).getImage();
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
      addAuthorAvatarImage(authorNames[0], avatar);
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

function replacePlaceholderText(elem, tags) {
  if (elem && (elem.innerText.includes('[page]') || elem.innerText.includes('[author]'))) {
    // find the first tag in tags which matches the path in topics-path or news-path
    let h1TitleTag;
    Object.keys(tags).forEach((tag) => {
      const tagData = tags[tag];
      if (tagData['topic-path'] === window.location.pathname || tagData['news-path'] === window.location.pathname) {
        h1TitleTag = tagData;
      }
    });
    elem.innerHTML = elem.innerHTML.replace('[page]', h1TitleTag?.label || '');
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

function findFirstTag() {
  const tags = getMetadata('article:tag').split(', ');
  return tags.find((tag) => tag.trim().toLowerCase().startsWith('topic/') || tag.trim().toLowerCase().startsWith('industry/'));
}

/**
 * loads and decorates the hero
 * @param {Element} block The hero block element
 */
export default async function decorate(block) {
  const isArticle = getMetadata('template') === 'article';
  const isMediaBlend = isArticle || block.classList.contains('media-blend');
  const tags = await fetchTagList();

  // extract block content
  const hero = document.createElement('udex-hero-banner');
  const heading = block.querySelector('h1');
  const eyebrow = block.querySelector('h6');
  let eyebrowText = eyebrow?.textContent;
  const contentTypeTag = tags[toCamelCase(getContentType())];

  if (!eyebrowText && isArticle) {
    // if no eyebrow text is set, use the content type for articles
    eyebrowText = contentTypeTag?.label || getContentType()?.split('/')[1].replace('-', ' ');
  }

  let newEyebrow = '';
  if (eyebrow?.firstElementChild?.tagName.toLowerCase() === 'a') {
    // If author has added a custom link, add appropriate classes for styling
    newEyebrow = buildEyebrow(eyebrow.firstElementChild);
  } else if (eyebrowText && isArticle) {
    // If article, add link to parent topics page, and appropriate classes for styling
    const eyeBrowHref = contentTypeTag['topic-path'] !== '0' ? contentTypeTag['topic-path'] : contentTypeTag['news-path'];
    newEyebrow = buildEyebrow(a({ href: eyeBrowHref }, eyebrowText));
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
    replacePlaceholderText(heading, tags),
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
  const firstTag = findFirstTag();
  if (firstTag) {
    tagContainer.append(new Tag(tags[toCamelCase(firstTag)]).render());
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
