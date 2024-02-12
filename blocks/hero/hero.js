/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // fetch optimized image
  const image = block.querySelector('img');
  let imageSrc = image.getAttribute('src')
    .replace('format=jpeg', 'format=webply')
    .replace('format=png', 'format=webply');

  const mediaQuery = window.matchMedia('(max-width: 650px)');
  // Check if the media query is true
  if (mediaQuery.matches) {
    imageSrc = imageSrc.replace('width=750', 'width=350');
  }
  image.closest('picture').remove();

  const hero = document.createElement('udex-hero-banner');
  hero.setAttribute('background-image', imageSrc);
  hero.setAttribute('background-image-label', 'Hero Banner background image label');
  hero.setAttribute('background-color', '#fbdab9');
  hero.innerHTML = '<div slot="content" class="hero-banner hero-banner--showcase"></div>';

  hero.querySelector('.hero-banner').append(block.querySelector('div'));

  block.innerHTML = hero.outerHTML;
  setTimeout(() => {
    hero.querySelector('udex-hero-banner')?.shadowRoot.querySelector('img')?.setAttribute('loading', 'eager');
  }, 1);
}
