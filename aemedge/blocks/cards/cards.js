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
      if (lastDiv.children.length === 1 && lastDiv.children[0].tagName === 'A') {
        [cardLink] = lastDiv.children;
      } else if (lastDiv.children.length === 1 && lastDiv.children[0].tagName === 'P' && lastDiv.children[0].children.length === 1 && lastDiv.children[0].children[0].tagName === 'A') {
        [cardLink] = lastDiv.children[0].children;
      }
      if (cardLink !== null) {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'cards-card-link';
        linkDiv.append(cardLink);
        cardDiv.removeChild(lastDiv);
        cardLink.innerHTML = '';
        cardLink.append(cardDiv);
        li.append(linkDiv);
      }
    }
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.classList.add(`elems${ul.children.length}`);
  block.append(ul);
}
