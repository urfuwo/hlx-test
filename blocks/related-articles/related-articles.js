import { ul } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';

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

export default async function decorateBlock(block) {
  const pageTags = getMetadata('article:tag').split(',');
  const filter = getFilter(pageTags);
  const limit = 4; // hardcoded for now
  const articleStream = await ffetch('/articles-index.json')
    .filter(filter)
    .limit(limit)
    .slice(0, limit - 1)
    .all();
  const cardList = ul();
  articleStream.forEach((article) => {
    const {
      author, 'content-type': type, image, path, title, publicationDate, priority,
    } = article;
    const label = priority === 'hot-topic' ? 'Hot Story' : '';
    const card = new PictureCard(title, path, type, label, author, image, publicationDate);
    cardList.append(card.render());
  });

  block.append(cardList);
}
