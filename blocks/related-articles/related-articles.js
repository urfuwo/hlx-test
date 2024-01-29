import { getMetadata, loadCSS } from '../../scripts/aem.js';
import { div, h3 } from '../../scripts/dom-builder.js';
import listArticles from '../article-list/article-list.js';

function getCategoryForReadMore() {
  const tags = getMetadata('article:tag').split(',');
  return tags.length > 0 ? tags[0] : null;
}

export default async function decorateBlock(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/article-list/article-list.css`);
  const category = getCategoryForReadMore();
  const title = h3({}, `More on ${category}`);

  const articles = div();
  listArticles(articles, { filter: null, maxEntries: 3 });

  block.textContent = '';

  block.append(title);
  block.append(articles);
}
