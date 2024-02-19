import '@udex/web-components/dist/HeroBanner.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // fetch optimized image
  const picture = block.querySelector('picture');

  const hero = document.createElement('udex-hero-banner');
  hero.setAttribute('background-color', '#fbdab9');
  hero.innerHTML = '<div slot="content" class="hero-banner hero-banner--showcase"></div>';
  picture.setAttribute('slot', 'backgroundPicture');
  const img = picture.querySelector('img');
  img.classList.add('custom-background-image');
  img.setAttribute('loading', 'eager');
  hero.prepend(picture);
  hero.querySelector('.hero-banner').append(block.querySelector('div'));

  block.innerHTML = hero.outerHTML;
}
