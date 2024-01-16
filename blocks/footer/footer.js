import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  const next = document.createElement('div');
  next.innerHTML = `<udex-text-field
  label="Test"
  value
  supporting-text="Test"
  value-state="Standard"
  direction="left"
  maxlength="60"
></udex-text-field>

<br /> <br />

<udex-hero-banner
  background-image="/images/bg3.png"
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

  block.append(next);
}
