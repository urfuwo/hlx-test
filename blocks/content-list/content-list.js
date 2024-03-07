import { readBlockConfig } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';

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

export default async function decorateBlock(block) {
  const config = Object.fromEntries(
    Object.entries(readBlockConfig(block)).map(([key, value]) => [key, value.split(',')]),
  );
  const filters = getFilter(config);
  const limits = config.limit ? config.limit[0] : -1;
  const articleStream = await ffetch('/articles-index.json')
    .filter(filters)
    .limit(limits)
    .slice(0, limits - 1)
    .all();
  const cardList = ul();
  articleStream.forEach((article) => {
    const {
      author, 'content-type': type, image, path, title, publicationDate, priority,
    } = article;
    const label = priority === 'hot-topic' ? 'Hot Story' : '';
    const card = new PictureCard(title, type, path, type, author, image, label, publicationDate);
    cardList.append(card.render());
  });
  block.textContent = '';
  block.append(cardList);
}
