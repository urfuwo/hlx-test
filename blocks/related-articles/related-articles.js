import { ul } from '../../scripts/dom-builder.js';
import { getMetadata, fetchPlaceholders, toCamelCase } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import { formatDate } from '../../scripts/utils.js';

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

function getPictureCard(article, placeholders) {
  const {
    author, 'content-type': type, image, path, title, priority,
  } = article;
  const tagLabel = placeholders[toCamelCase(priority)] || '';
  const info = formatDate(article.publicationDate * 1000);
  return new PictureCard(title, path, type, info, author, image, tagLabel);
}

export default async function decorateBlock(block) {
  const pageTags = getMetadata('article:tag').split(',');
  const filter = getFilter(pageTags);
  const limit = 4; // hardcoded for now
  const articleStream = await ffetch('/articles-index.json')
    .filter(filter)
    .limit(limit)
    .slice(0, limit - 1)
    .all();
  const placeholders = await fetchPlaceholders();
  const cardList = ul();
  articleStream.forEach((article) => {
    const card = getPictureCard(article, placeholders);
    cardList.append(card.render());
  });

  block.append(cardList);
}
