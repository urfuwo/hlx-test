/* global WebImporter */
const articlePanel = (main, document) => {
  document.querySelectorAll('.entry-content .panel').forEach((panel) => {
    // detecting event panels
    // sample: https://news.sap.com/2023/02/international-womens-day-2023-empathy-is-our-superpower-to-embrace-equity/
    const content = panel.querySelector('p');
    const registerLinks = panel.querySelector('ul');
    const buttons = document.createElement('div');
    registerLinks?.querySelectorAll('li').forEach((li) => {
      if (li.querySelector('a > strong')) {
        const wrapper = document.createElement('p');
        const link = li.querySelector('a');
        wrapper.append(link);
        [...link.childNodes].forEach((n) => {
          if (n.nodeName !== 'STRONG') {
            wrapper.append(n);
          }
        });
        buttons.append(wrapper);
      } else {
        buttons.append(li.innerHTML);
      }
    });

    const block = [['Promo'], ['', content, buttons]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    panel.replaceWith(table);
  });
};
export default articlePanel;
