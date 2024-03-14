import {
  createOptimizedPicture, getMetadata, toClassName, loadCSS, fetchPlaceholders,
} from '../../scripts/aem.js';
import {
  ul, li, a, span,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';

const ARTICLE_FORMATTER = new Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function renderCard(card) {
  const formattedDate = ARTICLE_FORMATTER.format(new Date(card.publicationDate * 1000));
  const cardAuthorUrl = `/author/${toClassName(card.author).replace('-', '')}`; // TODO look up author URL from index
  const cardElement = li(
    { class: 'card' },
    a(
      { href: card.path, 'aria-label': card.title },
      createOptimizedPicture(card.image, card.tile, false, [{ width: '750' }]),
    ),
    span(
      { class: 'cardcontent' },
      span({ class: 'template' }, card['content-type'].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())),
      (card['hot-story'] ? span({ class: 'hot' }, 'Hot Story') : ''),
      span(
        { class: 'title' },
        a({ href: card.path }, card.title),
      ),
      span(
        { class: 'author' },
        a({ href: cardAuthorUrl }, span(`${card.author}`)),
      ),
      span({ class: 'date' }, formattedDate),
    ),
  );
  fetchPlaceholders().then((placeholders) => {
    const hot = cardElement.querySelector('.hot');
    if (hot) hot.textContent = placeholders['Hot Story'] || 'Hot Story';
  });
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

  // for topics get filter from URL
  if (window.location.pathname.startsWith('/topics/') > 0) {
    const topic = window.location.pathname.split('/')[2];
    return (entry) => toClassName(entry.topics).includes(topic);
  }

  // for tags get filter from URL
  if (window.location.pathname.startsWith('/tags/') > 0) {
    const tag = window.location.pathname.split('/')[2];
    return (entry) => JSON.parse(entry.tags).map((t) => toClassName(t)).includes(tag);
  }

  // for everything else, filter by category
  return (entry) => {
    const category = getCategoryForReadMore();
    const tags = JSON.parse(entry.tags);
    if (Array.isArray(tags) && entry.tags.length > 0) {
      return tags.includes(category);
    }
    return false;
  };
}

export default async function listArticles(block, config = { filter: null, maxEntries: null }) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/article-list/article-list.css`);

  const links = Array.from(block.querySelectorAll(':scope > div a')).map((link) => new URL(link.href).pathname);
  if (links.length > 0) {
    config.filter = (entry) => links.includes(entry.path);
    config.sorting = (l, r) => links.indexOf(l.path) - links.indexOf(r.path);
  }

  let contextFilter = config.filter;
  if (!contextFilter) {
    contextFilter = determineContextFilter();
  }

  let articles = await ffetch(`${window.hlx.codeBasePath}/articles-index.json`).filter(contextFilter);

  if (config.maxEntries !== null) {
    articles = await articles.limit(config.maxEntries);
  }

  articles = await articles.all();
  if (config.sorting) {
    articles = articles.sort(config.sorting);
  }

  const cardList = ul({ class: 'article-list' });

  articles.forEach((article) => {
    const card = renderCard(article);
    cardList.append(card);
  });
  block.replaceWith(cardList);
}
