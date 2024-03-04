import {
  getMetadata, toClassName, fetchPlaceholders, toCamelCase,
} from '../../scripts/aem.js';
import { div, a } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const tags = getMetadata('article:tag');
  if (tags) {
    const placeholders = await fetchPlaceholders();
    const tagsLiEL = tags.split(',').map((tag) => placeholders[toCamelCase(`tag/${tag}`)] || tag).map((tag) => a({ href: `/tags/${toClassName(tag.trim())}` }, tag.trim()));
    const tagListEl = div({ class: 'tag-list' }, ...tagsLiEL);
    block.append(tagListEl);
  }
}
