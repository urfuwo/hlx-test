import '@udex/web-components/dist/HeroBanner.js';
import {
  div, h1, span,
} from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import formatDate from '../../scripts/utils.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const hero = document.createElement('udex-hero-banner');
  hero.setAttribute('id', 'media-blend');
  const contentSlot = div(
    {
      slot: 'content',
      class: ['hero-banner', 'media-blend__content'],
    },
    div(
      { class: ['media-blend__intro-text'] },
      block.querySelector('h6')?.textContent,
    ),
    h1(block.querySelector('h1')?.textContent),
    block.querySelector('p:last-of-type') ?? '',
    div(
      { class: ['media-blend__info-block'] },
      span(
        { class: ['media-blend__author'] },
        getMetadata('author'),
        ' •',
      ),
      span(
        { class: ['media-blend__date'] },
        formatDate(getMetadata('article:published_time')),
        getMetadata('article:read_time') ? ' •' : '',
      ),
      getMetadata('article:read_time') ? span(
        { class: ['media-blend__read-time'] },
        getMetadata('article:read_time'),
      ) : '',
    ),
  );
  hero.appendChild(contentSlot);

  // fetch optimized image
  const picture = block.querySelector('picture');
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

  block.innerHTML = '';
  block.appendChild(hero);
}
