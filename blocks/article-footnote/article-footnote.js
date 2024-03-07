import { div, p } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import { formatDate } from '../../scripts/utils.js';

export default async function decorateBlock(block) {
  const content = block.firstElementChild.firstElementChild;
  const meta = [
    getMetadata('published-time') ? `Published on ${formatDate(getMetadata('published-time'))}` : null,
    getMetadata('modified-time') ? `Updated on ${formatDate(getMetadata('modified-time'))}` : null,
  ];
  content.replaceWith(div(p(content.textContent), p(meta.filter(Boolean).join('. '))));
}
