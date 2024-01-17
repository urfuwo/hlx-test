import { getMetadata } from '../../scripts/aem.js';
import {
  ul, div, a, img, span,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';

const ARTICLE_INDEX = '/blog/articles-index.json';

const ARTICLE_FORMATTER = new Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

// TODO: change to web component once available
function renderCard(card) {
  const formattedDate = ARTICLE_FORMATTER.format(new Date(card.publicationDate * 1000));
  const cardclass = `card${card['hot story'] ? ' hot-story' : ''}`;
  const cardElement = div(
    { class: cardclass },
    a(
      { href: card.path },
      img({ src: card.image, alt: card.title }),
      span({ class: 'template' }, card.template),
      span({ class: 'title' }, card.title),
    ),
    a({ href: '#' }, span({ class: 'author' }, `By ${card.author}`)), // TODO: link to author page
    span({ class: 'date' }, formattedDate),
  );
  return cardElement;
}

function getCategoryForReadMore() {
  const tags = getMetadata('article:tag').split(',');
  return tags.length > 0 ? tags[0] : null;
}

function determineContextFilter() {
  // for authors, filter by author
  if (window.location.pathname.startsWith('/author/') > 0) {
    return (entry) => entry.author === getMetadata('author');
  }

  // for everything else, filter by category
  return (entry) => {
    const category = getCategoryForReadMore();
    return JSON.parse(entry.tags).includes(category);
  };
}

export default async function listArticles(block, config = { filter: null, maxEntries: null }) {
  let contextFilter = config.filter;
  if (!contextFilter) {
    contextFilter = determineContextFilter();
  }

  let articles = await ffetch(ARTICLE_INDEX)
    .filter(contextFilter);

  if (config.maxEntries !== null) {
    articles = await articles.limit(config.maxEntries);
  }

  articles = await articles.all();

  const cardList = ul({ class: 'card-list' });

  articles.forEach((article) => {
    const card = renderCard(article);
    cardList.append(card);
  });

  block.textContent = '';
  block.append(cardList);
}
