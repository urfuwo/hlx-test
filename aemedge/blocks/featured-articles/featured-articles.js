import { fetchPlaceholders, toCamelCase } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import { formatDate } from '../../scripts/utils.js';
import { allAuthorEntries, authorEntry } from '../../scripts/article.js';

function getPictureCard(article, placeholders, authEntry) {
  const {
    'content-type': type, image, path, title, priority, description,
  } = article;
  const tagLabel = placeholders[toCamelCase(priority)] || '';
  const info = `Updated on ${formatDate(article.publicationDate * 1000)}`;
  return new PictureCard(title, path, type, info, authEntry, image, tagLabel, description);
}

export default async function decorateBlock(block) {
  const horizontal = block.classList.contains('horizontal');
  const links = Array.from(block.querySelectorAll('a')).map((link) => new URL(link.href).pathname);
  if (links.length > 0) {
    const filter = (entry) => links.includes(entry.path);
    const articleStream = await ffetch(`${window.hlx.codeBasePath}/articles-index.json`)
      .filter(filter)
      .all();
    const placeholders = await fetchPlaceholders();
    const authEntries = await allAuthorEntries(articleStream);
    const cardList = ul();
    articleStream.forEach((article) => {
      const card = getPictureCard(article, placeholders, authorEntry(article, authEntries));
      cardList.append(card.render(horizontal));
    });
    block.append(cardList);
  }
  block.querySelector('div').remove();
}
