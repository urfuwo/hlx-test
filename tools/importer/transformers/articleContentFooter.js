/* global WebImporter */
const articleContentFooter = (main, document) => {
  const footnoteParagraph = document.querySelector(
    'section#main > article div.entry-content p.has-small-font-size:last-child, section#main > article div.entry-content p > small',
  );
  if (footnoteParagraph) {
    footnoteParagraph.querySelectorAll('br').forEach((br) => br.remove());
    const block = [['Article Footnote'], [footnoteParagraph.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    footnoteParagraph.replaceWith(table);
  }

  const footnoteWrapper = document.querySelector(
    'section#main > article div.entry-content div.footnote-wrapper',
  );
  if (footnoteWrapper) {
    const block = [['Article Footnote'], [footnoteWrapper.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    footnoteWrapper.replaceWith(table);
  }
};
export default articleContentFooter;
