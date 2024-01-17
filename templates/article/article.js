import { buildBlock, decorateBlock, decorateSections } from '../../scripts/aem.js';

export default function decorateMain(main) {
  const div = document.createElement('div');
  div.classList.add('section', 'article-footer');

  const readMore = buildBlock('related-articles', { elems: [] });
  div.append(readMore);
  main.append(div);

  decorateSections(main);
  decorateBlock(readMore);
}
