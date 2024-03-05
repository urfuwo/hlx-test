/* global WebImporter */

const articleIntro = (main, document) => {
  const fristParagraph = document.querySelector('.entry-content > p');
  if (fristParagraph?.classList.contains('has-large-font-size')) {
    const block = [['Article Intro'], [fristParagraph.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    fristParagraph.replaceWith(table);
  }

  const firstLead = document.querySelector('section#main > article p.lead');
  if (firstLead) {
    const block = [['Article Intro'], [firstLead.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    firstLead.replaceWith(table);
  }

  document.querySelectorAll('section#main > article p.lead').forEach((lead) => {
    const h3 = document.createElement('h3');
    h3.textContent = lead.textContent;
    lead.replaceWith(h3);
  });
};
export default articleIntro;
