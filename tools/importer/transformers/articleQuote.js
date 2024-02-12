/* global WebImporter */
const transformQuote = (main, document) => {
  main.querySelectorAll('blockquote').forEach((quote) => {
    let quoteAttribution = '';
    if (quote.querySelector('cite')) {
      quoteAttribution = quote.querySelector('cite');
      quote.querySelector('cite').remove();
    }
    const block = [['Quote'], [quote.innerHTML]];
    if (quoteAttribution) {
      block.push([quoteAttribution]);
    }
    const table = WebImporter.DOMUtils.createTable(block, document);
    quote.replaceWith(table);
  });
};
export default transformQuote;
