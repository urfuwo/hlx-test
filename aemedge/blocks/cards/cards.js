import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cards-card';
    while (row.firstElementChild) cardDiv.append(row.firstElementChild);
    [...cardDiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    const li = document.createElement('li');
    li.append(cardDiv);
    if (block.classList.contains('tiles') && cardDiv.children.length > 0) {
      const lastDiv = cardDiv.children[cardDiv.children.length - 1];
      let cardLink = null;
      let current = lastDiv;
      while (current.children.length > 0) {
        [current] = current.children;
        if (current.tagName === 'A') {
          cardLink = current;
          break;
        }
      }
      if (cardLink !== null) {
        const linkParent = cardLink.parentNode;
        const linkContent = cardLink.childNodes;
        [...linkContent].forEach((node) => {
          linkParent.insertBefore(node, cardLink);
        });
        linkParent.removeChild(cardLink);
        linkParent.normalize();
        const linkElement = document.createElement('a');
        linkElement.href = cardLink.href;
        linkElement.append(cardDiv);
        const linkDiv = document.createElement('div');
        linkDiv.className = 'cards-card-link';
        linkDiv.append(linkElement);
        li.append(linkDiv);
      }
    }
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.classList.add(`elems${ul.children.length}`);
  if (ul.children.length > 8) {
    block.classList.add('elems9plus');
  }
  block.append(ul);
}
