import { getMetadata } from '../../scripts/aem.js';
import {
  ul, div, a, img, span, h3,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';

function buildCard(article) {
  const formatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedDate = formatter.format(new Date(article.publicationDate * 1000));
  const cardclass = `card${article['hot story'] ? ' hot-story' : ''}`;
  const card = div(
    { class: cardclass },
    a(
      { href: article.path },
      img({ src: article.image, alt: article.title }),
      span({ class: 'template' }, article.template),
      span({ class: 'title' }, article.title),
    ),
    a({ href: '#' }, span({ class: 'author' }, `By ${article.author}`)), // TODO: link to author page
    span({ class: 'date' }, formattedDate),
  );
  return card;
}

function getCategoryForReadMore() {
  const tags = getMetadata('article:tag').split(',');
  return tags.length > 0 ? tags[0] : null;
}

export default async function decorateBlock(block) {
  const category = getCategoryForReadMore();
  const title = h3({}, `More on ${category}`);

  let articles = await ffetch('/blog/articles-index.json')
    .filter((entry) => JSON.parse(entry.tags).includes(category))
    .all();

  articles = articles.sort((item1, item2) => item2.publishDate - item1.publishDate).slice(0, 2);

  const cardList = ul({ class: 'card-list' });
  articles.forEach((article) => {
    const card = buildCard(article);
    cardList.append(card);
  });

  block.textContent = '';

  block.append(title);
  block.append(cardList);
}
