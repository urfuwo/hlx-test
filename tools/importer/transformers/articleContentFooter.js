/* global WebImporter */

const articleContentFooter = (main, document) => {
  const footnoteParagraph = document.querySelector('.entry-content p.has-small-font-size:last-child');
  if (footnoteParagraph) {
    const block = [['Article Footnote'], [footnoteParagraph.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    footnoteParagraph.replaceWith(table);
  }
};
export default articleContentFooter;
