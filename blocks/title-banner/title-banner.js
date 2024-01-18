import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  if (block.classList.contains('author')) {
    // if the block is empty, add a title
    if (!block.querySelector('h1')) {
      const author = getMetadata('author');
      if (author) {
        const h1 = document.createElement('h1');
        h1.innerHTML = `Articles by <strong>${author}</strong>`;
        block.prepend(h1);
      }
    }
  }
}
