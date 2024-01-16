/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // decorate hero DOM
  const image = block.querySelector('img');
  const imageSrc = image.getAttribute('src').replace('format=jpeg', 'format=webply');
  const hero = document.createElement('div');
  hero.innerHTML = `<udex-hero-banner
  background-image="${imageSrc}"
  background-image-label="Hero Banner background image label"
  background-color="#fbdab9"
  id="showcase"
>
    <div slot="content" class="hero-banner hero-banner--showcase">
      <h1>Grow your business through enterprise</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere in massa id fringilla. Nunc rutrum turpis purus, et dignissim arcu gravida ut. Morbi sed sem ac magna consectetur tincidunt dapibus sed ipsum. </p>
      <div class="hero-banner__buttons">
        <ui5-button design="Positive">Request a demo</ui5-button>
        <ui5-button design="Transparent">Watch the video</ui5-button>
      </div>
    </div>
</udex-hero-banner>`;

  block.replaceWith(hero);
}
