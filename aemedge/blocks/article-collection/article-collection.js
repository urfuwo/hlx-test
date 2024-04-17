import { ul } from '../../scripts/dom-builder.js';
import Card from '../../libs/card/card.js';
import { loadCSS } from '../../scripts/aem.js';

export default async function decorate(block) {
  loadCSS(`${window.hlx.codeBasePath}/styles/card-list.css`);
  block.classList.add('card-list', 'card-list--text');

  const cardList = ul({ class: 'card-items' });
  [...block.children].forEach((row) => {
    const eyebrow = row.querySelector('h6')?.textContent || '';
    const title = row.querySelector('h1')?.textContent || '';
    const additionalDetails = row.querySelector('p:not(.button-container)')?.textContent || '';
    const path = row.querySelector('a').href;

    cardList.append(new Card(title, path, eyebrow, additionalDetails).render());
    row.remove();
  });
  block.append(cardList);
}
