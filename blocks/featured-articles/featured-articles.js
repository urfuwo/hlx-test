import { fetchPlaceholders, toCamelCase } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import { formatDate } from '../../scripts/utils.js';

function getPictureCard(article, placeholders) {
  const {
    author, 'content-type': type, image, path, title, priority,
  } = article;
  const tagLabel = placeholders[toCamelCase(priority)] || '';
  const info = formatDate(article.publicationDate * 1000);
  return new PictureCard(title, path, type, info, author, image, tagLabel);
}

export default async function decorateBlock(block) {
  const horizontal = block.classList.contains('horizontal');
  const links = Array.from(block.querySelectorAll('a')).map((link) => new URL(link.href).pathname);
  if (links.length > 0) {
    const filter = (entry) => links.includes(entry.path);
    const articleStream = await ffetch('/articles-index.json').filter(filter).all();
    const placeholders = await fetchPlaceholders();
    const cardList = ul();
    articleStream.forEach((article) => {
      const card = getPictureCard(article, placeholders);
      cardList.append(card.render(horizontal));
    });
    block.append(cardList);
  }
  block.querySelector('div').remove();
}
