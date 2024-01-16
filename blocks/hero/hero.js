/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // fetch optimized image
  const image = block.querySelector('img');
  const imageSrc = image.getAttribute('src')
    .replace('format=jpeg', 'format=webply')
    .replace('format=png', 'format=webply');
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
}
