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

  main.querySelectorAll('p.lead:has(+ p em)').forEach((quoteTextElem) => {
    /* quoteText: wrap entire quote text with paragraphs, remove newlines */
    let qText = `<p>${quoteTextElem.innerHTML}</p>`;
    qText = qText.replace(/[\n\t]/gm, '');
    /* quoteText: replace all brs with closing / opening paragraphs */
    qText = qText.replaceAll(/<br>/gm, '</p><p>');
    const quoteSourceElem = quoteTextElem.nextElementSibling.firstElementChild;
    /* quoteSource: remove newlines and replace brs with spaces */
    let qSource = quoteSourceElem.innerHTML.replace(/[\n\t]/gm, '');
    qSource = qSource.replaceAll(/<br>/g, ' ');
    const block = [['Quote'], [qText], [qSource]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    quoteTextElem.replaceWith(table);
    quoteSourceElem.remove();
  });
};
export default transformQuote;
