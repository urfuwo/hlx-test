import { getMetadata } from '../../scripts/aem.js';
import { h1, strong } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  if (block.classList.contains('author')) {
    // if the block is empty, add a title
    if (!block.querySelector('h1')) {
      const author = getMetadata('author');
      if (author) {
        const headline = h1('Articles by ');
        headline.appendChild(strong(author));
        block.prepend(headline);
      }
    }
  }
}
