import '@udex/web-components/dist/HeroBanner.js';
import {
  div, h1, span, p,
} from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import { formatDate } from '../../scripts/utils.js';

/*
  * Assumption: The last paragraph is the description if it exists and has text
*/
function getDescription(block) {
  const lastP = block.querySelector('p:last-of-type');
  return lastP ? lastP.textContent?.trim() : '';
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const hero = document.createElement('udex-hero-banner');
  hero.setAttribute('id', 'media-blend');
  const intro = block.querySelector('h6');
  const heading = block.querySelector('h1');
  const description = getDescription(block);
  const contentSlot = div(
    {
      slot: 'content',
      class: ['hero-banner', 'media-blend__content'],
    },
    intro ? div(
      { class: ['media-blend__intro-text'] },
      block.querySelector('h6')?.textContent,
    ) : '',
    heading ? h1(heading?.textContent) : '',
    description ? p(getDescription(block)) : '',
    div(
      { class: ['media-blend__info-block'] },
      getMetadata('author') ? span(
        { class: ['media-blend__author'] },
        getMetadata('author'),
        ' •',
      ) : '',
      getMetadata('published-time') ? span(
        { class: ['media-blend__date'] },
        formatDate(getMetadata('published-time')),
        getMetadata('article:read_time') ? ' •' : '',
      ) : '',
      // TODO this is wrong we don't have read time in metadata
      getMetadata('article:read_time') ? span(
        { class: ['media-blend__read-time'] },
        getMetadata('article:read_time'),
      ) : '',
    ),
  );
  hero.appendChild(contentSlot);

  // fetch optimized image
  const picture = block.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    img.classList.add('custom-background-image');

    const additionalContentSlot = div(
      {
        slot: 'additionalContent',
        class: ['hero-banner', 'media-blend__additional-content'],
      },
      picture,
    );
    hero.appendChild(additionalContentSlot);
  }

  block.innerHTML = '';
  block.appendChild(hero);
}
