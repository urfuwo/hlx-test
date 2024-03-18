/* global WebImporter */

const articleIntro = (main, document) => {
  // news
  const fristParagraph = main.querySelector('.entry-content > p');
  if (fristParagraph?.classList.contains('has-large-font-size')) {
    const block = [['Article Intro'], [fristParagraph.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    fristParagraph.replaceWith(table);
  }

  const firstLead = main.querySelector('section#main > article p.lead');
  if (firstLead) {
    const block = [['Article Intro'], [firstLead.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    firstLead.replaceWith(table);
  }

  main.querySelectorAll('section#main > article p.lead').forEach((lead) => {
    const h3 = document.createElement('h3');
    h3.textContent = lead.textContent;
    lead.replaceWith(h3);
  });

  // insights
  const insightsLead = main.querySelector('div.Section__headline--Ui63m h2, div.Section__sectionContentIsFirst--YvGqK h3, div.Section__sectionContentIsFirst--YvGqK h4');
  if (insightsLead) {
    const block = [['Article Intro'], [insightsLead.outerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    insightsLead.replaceWith(table);
  }
};
export default articleIntro;
