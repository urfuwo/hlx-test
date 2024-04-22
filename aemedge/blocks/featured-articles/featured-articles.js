import { fetchPlaceholders, getMetadata, toCamelCase } from '../../scripts/aem.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import { formatDate, fetchPages } from '../../scripts/utils.js';
import { allAuthorEntries, authorEntryFromAuthor } from '../../scripts/article.js';

function getPictureCard(article, placeholders, authEntry, eager) {
  const tagLabel = placeholders[toCamelCase(getMetadata('priority', article))] || '';
  const info = `Updated on ${formatDate(getMetadata('published-time', article))}`;
  return new PictureCard(
    getMetadata('og:title', article),
    getMetadata('og:url', article),
    getMetadata('content-type', article),
    info,
    authEntry,
    getMetadata('og:image', article),
    tagLabel,
    getMetadata('og:description', article),
    eager,
  );
}

export default async function decorateBlock(block) {
  const horizontal = block.classList.contains('horizontal');
  const links = Array.from(block.querySelectorAll('a')).map((link) => new URL(link.href).pathname);
  if (links.length > 0) {
    const articles = await fetchPages(links);
    articles.sort((a, b) => new Date(getMetadata('published-time', b)) - new Date(getMetadata('published-time', a)));
    const placeholders = await fetchPlaceholders();
    const authEntries = await allAuthorEntries(articles);
    const cardList = ul();
    Array.from(articles).forEach((article, index) => {
      const card = getPictureCard(article, placeholders, authorEntryFromAuthor(getMetadata('author', article), authEntries), index === 0);
      cardList.append(card.render(horizontal));
    });
    block.append(cardList);
  }
  block.querySelector('div').remove();
}
