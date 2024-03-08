import { readBlockConfig } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import Card from '../../libs/card/card.js';

function matchTags(entry, config) {
  return config.tags.some((item) => entry.tags.includes(item.trim()));
}

function matchAuthors(entry, config) {
  const authors = entry.author.split(',');
  return config.authors.some((item) => authors.includes(item.trim()));
}

function matchTopics(entry, config) {
  return config.topics.some((item) => entry.topics.includes(item.trim()));
}

function matchContentType(entry, config) {
  const contentType = entry['content-type'].split(',');
  return config['content-type'].some((item) => contentType.includes(item.trim()));
}

function getFilter(config) {
  return (entry) => entry.path !== window.location.pathname
    && matchTags(entry, config)
    && matchAuthors(entry, config)
    && matchTopics(entry, config)
    && matchContentType(entry, config);
}

function getPictureCard(article) {
  const {
    author, 'content-type': type, image, path, title, publicationDate, priority,
  } = article;
  const label = priority === 'hot-topic' ? 'Hot Story' : '';
  return new PictureCard(title, path, type, label, author, image, publicationDate);
}

function getCard(article) {
  const {
    'content-type': type, path, title, publicationDate,
  } = article;
  const ARTICLE_FORMATTER = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const publishedDate = ARTICLE_FORMATTER.format(new Date(publicationDate * 1000));
  return new Card(title, path, type, publishedDate);
}

export default async function decorateBlock(block) {
  const textOnly = block.classList.contains('text-only');
  const config = Object.fromEntries(
    Object.entries(readBlockConfig(block)).map(([key, value]) => [key, value.split(',')]),
  );
  const filter = getFilter(config);
  const limit = config.limit ? +config.limit[0] + 1 : -1;
  const articleStream = await ffetch('/articles-index.json')
    .filter(filter)
    .limit(limit)
    .slice(0, limit - 1)
    .all();
  const cardList = ul();
  articleStream.forEach((article) => {
    if (textOnly) {
      const card = getCard(article);
      cardList.append(card.render());
    } else {
      const card = getPictureCard(article);
      cardList.append(card.render());
    }
  });
  block.textContent = '';
  block.append(cardList);
}
