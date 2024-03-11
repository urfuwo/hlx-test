import { readBlockConfig, fetchPlaceholders, toCamelCase } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import Card from '../../libs/card/card.js';
import Button from '../../libs/button/button.js';
import { formatDate } from '../../scripts/utils.js';

function matchTags(entry, config) {
  if (!config.tags) return true;
  return config.tags.some((item) => entry.tags.includes(item.trim()));
}

function matchAuthors(entry, config) {
  if (!config.authors) return true;
  const authors = entry.author.split(',');
  return config.authors.some((item) => authors.includes(item.trim()));
}

function matchTopics(entry, config) {
  if (!config.topics) return true;
  return config.topics.some((item) => entry.topics.includes(item.trim()));
}

function matchContentType(entry, config) {
  if (!config['content-type']) return true;
  const contentType = entry['content-type'].split(',');
  return config['content-type'].some((item) => contentType.includes(item.trim()));
}

function getFilter(config) {
  return (entry) => matchTags(entry, config)
    && matchAuthors(entry, config)
    && matchTopics(entry, config)
    && matchContentType(entry, config);
}

function getPlaceHolderValue(key, placeholders) {
  const value = placeholders[toCamelCase(key)];
  return value || '';
}

function getInfo(article, config) {
  const { info = ['publicationDate'] } = config;
  if (info[0] === 'publicationDate') {
    return formatDate(article.publicationDate * 1000);
  }
  if (info[0] === 'author') {
    return article.author;
  }
  if (info[0] === 'reading-time') {
    return ''; // TODO - Needs implementation
  }
  return '';
}

function getPictureCard(article, config, placeholders) {
  const {
    author, 'content-type': type, image, path, title, priority,
  } = article;
  const tagLabel = getPlaceHolderValue(priority, placeholders);
  const info = getInfo(article, config);
  return new PictureCard(title, path, type, info, author, image, tagLabel);
}

function getCard(article, config) {
  const { 'content-type': type, path, title } = article;
  const info = getInfo(article, config);
  return new Card(title, path, type, info);
}

export default async function decorateBlock(block) {
  const textOnly = block.classList.contains('text-only');
  const config = Object.fromEntries(
    Object.entries(readBlockConfig(block)).map(([key, value]) => [key, value.split(',')]),
  );
  const filter = getFilter(config);
  const limit = config.limit ? +config.limit[0] + 1 : -1;
  let articleStream = await ffetch('/articles-index.json')
    .filter((entry) => entry.path !== window.location.pathname)
    .filter(filter)
    .limit(limit)
    .slice(0, limit - 1)
    .all();
  const placeholders = await fetchPlaceholders();
  const itemCount = articleStream.length;
  let viewBtn;
  if (itemCount > 10 && itemCount < 20) {
    articleStream = articleStream.slice(0, 10); // only show first 10, rest will be paginated
    viewBtn = new Button('Show More', 'icon-link-arrow');
  }
  const cardList = ul();
  articleStream.forEach((article) => {
    let card;
    if (textOnly) {
      card = getCard(article, config);
    } else {
      card = getPictureCard(article, config, placeholders);
    }
    cardList.append(card.render());
  });
  block.textContent = '';
  block.append(cardList);
  if (viewBtn) block.append(viewBtn.render());
}
