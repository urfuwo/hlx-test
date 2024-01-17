import {
  buildBlock,
  decorateBlock,
  decorateSections,
  getMetadata,
} from '../../scripts/aem.js';

/**
 * Highlight the first paragraph of a blog page
 * Only enabled for pages annotated as metadata:template = blog
 * @param main
 */
function highlightBlogFirstParagraph(main) {
  if (getMetadata('template') === 'blog') {
    const firstPara = main.querySelector('p');
    if (firstPara) {
      firstPara.classList.add('blog--highlight');
    }
  }
}

export default function decorateMain(main) {
  highlightBlogFirstParagraph(main);

  const div = document.createElement('div');
  div.classList.add('section', 'article-footer');

  const readMore = buildBlock('related-articles', { elems: [] });
  div.append(readMore);
  main.append(div);

  decorateSections(main);
  decorateBlock(readMore);
}
