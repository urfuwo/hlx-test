/* global WebImporter */

const articleInfo = (main, document) => {
  const fristParagraph = document.querySelector('.entry-content > p');
  if (fristParagraph?.classList.contains('has-large-font-size')) {
    const block = [['Article Intro'], [fristParagraph.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    fristParagraph.replaceWith(table);
  }
};
export default articleInfo;
