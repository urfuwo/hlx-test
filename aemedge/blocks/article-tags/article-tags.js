import {
  getMetadata,
  toCamelCase,
} from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import Tag from '../../libs/tag/tag.js';
import { fetchTagList } from '../../scripts/utils.js';

export default async function decorate(block) {
  const articleTags = getMetadata('article:tag');
  if (articleTags) {
    const tags = await fetchTagList();
    const tagsLiEL = articleTags.split(', ').filter((articleTag) => {
      const tag = tags[toCamelCase(articleTag)];
      return tag && !tag.key.startsWith('content-type/') && (tag['topic-path'] || tag['news-path']);
    }).map((articleTag) => {
      const tag = tags[toCamelCase(articleTag)];
      return new Tag(tag).render();
    });
    const tagListEl = div({ class: 'tag-list' }, ...tagsLiEL);
    block.append(tagListEl);
  }
}
