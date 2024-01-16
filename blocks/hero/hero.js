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
  const hero = document.createElement('div');
  hero.innerHTML = `<udex-hero-banner
    background-image="${imageSrc}"
    background-image-label="Hero Banner background image label"
    background-color="#fbdab9"
    id="showcase"
  >
    <div slot="content" class="hero-banner hero-banner--showcase">
    </div>
  </udex-hero-banner>`;
  hero.querySelector('.hero-banner').append(block.querySelector('h1'));
  block.replaceWith(hero);
  setTimeout(() => {
    hero.querySelector('udex-hero-banner')?.shadowRoot.querySelector('img')?.setAttribute('loading', 'eager');
  }, 1);
}
