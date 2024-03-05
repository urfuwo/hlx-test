/* global WebImporter */
const articleContentFooter = (main, document) => {
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
