import { ul } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';

function getFilter(pageTags) {
  return (entry) => {
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
  const limit = 3; // hardcoded for now
  const articleStream = await ffetch('/articles-index.json').filter(filter).limit(limit).all();

  const cardList = ul({ class: 'article-list' });
  articleStream.forEach((article) => {
    const {
      author, 'content-type': type, image, path, title,
    } = article;
    const card = new PictureCard(title, type, path, type, author, image, '', '');
    cardList.append(card.render());
  });

  block.textContent = '';
  block.append(cardList);
}
