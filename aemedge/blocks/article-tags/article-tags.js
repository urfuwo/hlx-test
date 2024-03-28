import {
  getMetadata, fetchPlaceholders,
} from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import Tag from '../../libs/tag/tag.js';

export default async function decorate(block) {
  const tags = getMetadata('article:tag');
  if (tags) {
    const placeholders = await fetchPlaceholders();
    const tagsLiEL = tags.split(',').map((tag) => new Tag(tag, placeholders).render());
    const tagListEl = div({ class: 'tag-list' }, ...tagsLiEL);
    block.append(tagListEl);
  }
}
