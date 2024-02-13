import { div } from '../../scripts/dom-builder.js';
import listArticles from '../article-list/article-list.js';

export default async function decorateBlock(block) {
  const articles = div();
  listArticles(articles, { filter: null, maxEntries: 3 });

  block.textContent = '';
  block.append(articles);
}
