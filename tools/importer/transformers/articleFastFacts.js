/* global WebImporter */

// sample https://www.sap.com/insights/research/does-your-business-have-a-talent-for-sustainability.html

// eslint-disable-next-line no-unused-vars
export default function articleFastFacts(main, document) {
  document.querySelectorAll('div[class*="UniversalLayout__factContainer--"]').forEach((keyFact) => {
    const content = keyFact.closest('div[data-component-name="UniversalLayout"]');
    if (content) {
      const cells = [['Fast Facts']];

      content.querySelectorAll('div[class*="UniversalLayout__universalItem--"]').forEach((item) => {
        const factName = item.querySelector('span[class^="UniversalLayout__factName--"]');
        const wrapper = document.createElement('div');
        const factNameWrapper = document.createElement('h4');
        factNameWrapper.textContent = factName.textContent;
        wrapper.append(factNameWrapper);

        const factUnit = item.querySelector('span[class^="UniversalLayout__factUnit--"]');
        if (factUnit) {
          const factUnitWrapper = document.createElement('h5');
          factUnitWrapper.textContent = factUnit.textContent;
          wrapper.append(factUnitWrapper);
        }

        const factContent = item.querySelector('div[class*="UniversalLayout__fastFact--"]');
        if (factContent) {
          wrapper.append(factContent);
        }

        cells.push([wrapper]);
      });

      const table = WebImporter.DOMUtils.createTable(cells, document);
      content.replaceWith(table);
    }
  });
}
