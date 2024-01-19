import { getMetadata, toClassName } from '../../scripts/aem.js';
import { div, a } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const tags = getMetadata('article:tag');
  if (tags) {
    const tagsLiEL = tags.split(',').map((tag) => a({ href: `/tags/${toClassName(tag.trim())}` }, tag.trim()));
    const tagListEl = div({ class: 'tag-list' }, 'Tags: ', ...tagsLiEL);
    block.append(tagListEl);
  }
}
