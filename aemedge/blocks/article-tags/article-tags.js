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
    const tagsLiEL = articleTags.split(', ').map((articleTag) => {
      let tag = tags[toCamelCase(articleTag)];
      if (!tag) { // fallback for tags we haven't mapped
        const articleTagArr = articleTag.split('/');
        tag = { key: articleTag, label: articleTag, 'topic-path': `/topics/${articleTagArr[1]}` };
        if (articleTagArr[0] === 'news-tag') {
          tag['news-path'] = `/news/${articleTagArr[1]}`;
        }
      }
      return new Tag(tag).render();
    });
    const tagListEl = div({ class: 'tag-list' }, ...tagsLiEL);
    block.append(tagListEl);
  }
}
