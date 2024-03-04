/* global WebImporter */

const articleInfo = (main, document) => {
  const fristParagraph = document.querySelector('.entry-content > p');
  if (fristParagraph?.classList.contains('has-large-font-size')) {
    const block = [['Article Intro'], [fristParagraph.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    fristParagraph.replaceWith(table);
  }

  document.querySelectorAll('section#main > article p.lead').forEach((lead) => {
    const block = [['Article Intro'], [lead.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    lead.replaceWith(table);
  });
};
export default articleInfo;
