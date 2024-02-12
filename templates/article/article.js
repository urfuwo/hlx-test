import { buildBlock, getMetadata } from '../../scripts/aem.js';

/**
 * Highlight the first paragraph of a blog page
 * Only enabled for pages annotated as metadata:template = blog
 * @param main
 */
function highlightBlogFirstParagraph(main) {
  if (getMetadata('template') === 'blog') {
    const firstParagraph = main.querySelector('.hero + p');
    if (firstParagraph) {
      firstParagraph.classList.add('blog--highlight');
    }
  }
}

export default function decorateMain(main) {
  if (main.children.length !== 0) {
    highlightBlogFirstParagraph(main);

    const aritcleTags = buildBlock('article-tags', { elems: [] });
    main.querySelector('div').append(aritcleTags);

    const div = document.createElement('div');
    const readMore = buildBlock('related-articles', { elems: [] });
    div.append(readMore);
    main.append(div);
  }
}
