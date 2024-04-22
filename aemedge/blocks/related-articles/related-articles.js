import { ul } from '../../scripts/dom-builder.js';
import {
  getMetadata, fetchPlaceholders, toCamelCase,
} from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import { fetchTagList, formatDate } from '../../scripts/utils.js';
import { allAuthorEntries, authorEntry } from '../../scripts/article.js';

function getFilter(pageTags) {
  return (entry) => {
    if (entry.path === window.location.pathname) return false;
    const entryTags = JSON.parse(entry.tags);
    if (Array.isArray(entryTags) && entryTags.length > 0) {
      return pageTags.some((item) => entryTags.includes(item));
    }
    return false;
  };
}

function getPictureCard(article, placeholders, authEntry) {
  const {
    contentType, image, path, title, priority,
  } = article;

  const tagLabel = placeholders[toCamelCase(priority)] || '';
  const info = `Updated on ${formatDate(article.publicationDate * 1000)}`;
  return new PictureCard(title, path, contentType, info, authEntry, image, tagLabel);
}

export default async function decorateBlock(block) {
  const pageTags = getMetadata('article:tag').split(', ');
  const filter = getFilter(pageTags);
  const limit = 4;
  const articles = await ffetch(`${window.hlx.codeBasePath}/articles-index.json`)
    .filter(filter)
    .limit(limit)
    .slice(0, limit - 1)
    .all();
  const placeholders = await fetchPlaceholders();
  const tags = await fetchTagList();
  const authEntries = await allAuthorEntries(articles);
  const cardList = ul();
  articles.forEach((article) => {
    const contentType = JSON.parse(article.tags).find((tag) => tag.startsWith('content-type'));
    if (contentType) {
      article.contentType = tags[toCamelCase(contentType)]?.label || '';
    }

    const card = getPictureCard(article, placeholders, authorEntry(article, authEntries));
    cardList.append(card.render());
  });

  block.append(cardList);
}
