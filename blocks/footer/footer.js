import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { img, span } from '../../scripts/dom-builder.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta.footer || '/draft/satyam/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  const backToTop = span(
    {
      'class': ['icon', 'icon-back-to-top'],
    },
    img(
    { 'src': '/icons/back-to-top.svg'},
  ));

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  footer.append(backToTop);
  block.append(footer);
}
