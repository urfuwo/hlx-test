import { fetchPlaceholders, getMetadata, toCamelCase } from '../../scripts/aem.js';
import { h1, strong } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  if (!block.querySelector('h1')) {
    let dynamicHeadline = '';
    if (block.classList.contains('author')) {
      const author = getMetadata('author');
      dynamicHeadline = author ? h1('Articles by ', strong(author)) : h1('No articles');
    } else if ((block.classList.contains('tags') && window.location.pathname.includes('/tags/')) || (block.classList.contains('topics') && window.location.pathname.includes('/topics/'))) {
      const key = window.location.pathname.split('/').pop();
      const prefix = block.classList.contains('tags') ? 'tag/' : 'topic/';
      const placeholders = await fetchPlaceholders();
      const title = placeholders[toCamelCase(`${prefix}${key}`)] || key;
      dynamicHeadline = h1('Articles for ', strong(title));
    }
    if (dynamicHeadline) {
      block.append(dynamicHeadline);
    }
  }
}
