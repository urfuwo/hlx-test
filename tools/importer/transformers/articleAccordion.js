/* global WebImporter */

const articleAccordion = (main, document) => {
  // insights
  main.querySelectorAll('div.section.accordion').forEach((accordionWrapper) => {
    const entries = [];
    accordionWrapper.querySelectorAll('.AccordionItem__root--fWYZn').forEach((entryWrapper) => {
      const entryTitle = entryWrapper.querySelector('.AccordionItem__title--mnlMe').textContent;
      const entryContent = entryWrapper.querySelector('.AccordionItem__slideAccordion--DgFIG').innerHTML;
      entries.push([entryTitle, entryContent]);
    });

    const block = [['Accordion'], ...entries];
    const table = WebImporter.DOMUtils.createTable(block, document);
    accordionWrapper.replaceWith(table);
  });
};

export default articleAccordion;
