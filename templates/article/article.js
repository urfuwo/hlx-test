import { getMetadata } from '../../scripts/aem.js';

/**
 * Highlight the first paragraph of a blog page
 * Only enabled for pages annotated as metadata:template = blog
 * @param main
 */
function highlightBlogFirstParagraph(main) { // TODO is this still needed for the new design?
  if (getMetadata('content-type') === 'executive-blog') {
    const firstParagraph = main.querySelector('.hero + p');
    if (firstParagraph) {
      firstParagraph.classList.add('article--highlight');
    }
  }
}

export default function decorateMain(main) {
  if (main.children.length !== 0) {
    highlightBlogFirstParagraph(main);
  }
}
