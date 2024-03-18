/* global WebImporter */
function cleanQuoteText(qText) {
  /* remove normal quotes surrounding the text */
  let qT = qText.replace(/^"(.*)"$/gm, '$1');
  /* remove fancy quotes surrounding the text */
  qT = qT.replace(/^“(.*)”$/gm, '$1');
  /* wrap entire quote text with paragraph */
  qT = `<p>${qT}</p>`;
  /* remove newlines */
  qT = qT.replace(/[\n\t]/gm, '');
  /* replace all brs with spaces */
  qT = qT.replaceAll(/<br>/gm, ' ');
  return qT;
}

function cleanQuoteSource(qSource) {
  /* remove newlines, replace brs with whitespace */
  let qS = qSource.replace(/[\n\t]/gm, '').replaceAll(/<br>/g, ' ');
  /* remove <cite> elements */
  qS = qS.replace(/<cite>(.*)<\/cite>/gm, '$1');
  /* wrap entire quote source with a p and a span */
  qS = `<p><span>${qS}</span></p>`;
  return qS;
}

/* Quote type 1: https://news.sap.com/2024/01/sap-announces-q4-and-fy-2023-results/, multiple quotes in one blockquote */
function handleQuoteType1(main, document) {
  const surroundingBQs = [];
  main.querySelectorAll('blockquote p:has(+ p strong)').forEach((quoteTextElem) => {
    const surroundingBQ = quoteTextElem.parentNode;
    const qText = cleanQuoteText(quoteTextElem.innerHTML);
    const quoteSourceElem = quoteTextElem.nextElementSibling.firstElementChild;
    const qSource = quoteSourceElem ? cleanQuoteSource(quoteSourceElem.innerHTML) : '';
    const table = WebImporter.DOMUtils.createTable([['Quote'], [qText], [qSource]], document);
    /* move newly created table before the blockquote (to preserve the order of multiple quotes) */
    surroundingBQ.before(table);
    /* add surroundingBQ to clean-up list */
    if (!surroundingBQs.includes(surroundingBQ)) {
      surroundingBQs.push(surroundingBQ);
    }
  });
  /* finally: remove all remaining blockquotes */
  surroundingBQs.forEach((surroundingBQ) => {
    surroundingBQ.remove();
  });
}

/* Quote type 2: https://news.sap.com/2024/01/modernize-sap-bw-with-sap-datasphere-open-data-ecosystem/ */
function handleQuoteType2(main, document) {
  const surroundingBQs = [];
  main.querySelectorAll('blockquote p').forEach((quoteTextElem) => {
    const surroundingBQ = quoteTextElem.parentNode;
    const quoteText = cleanQuoteText(quoteTextElem.innerHTML);
    const block = [['Quote'], [quoteText]];
    const quoteSourceElem = surroundingBQ.querySelector('cite');
    if (quoteSourceElem) {
      const quoteSource = cleanQuoteSource(quoteSourceElem.innerHTML);
      block.push([quoteSource]);
    }
    const table = WebImporter.DOMUtils.createTable(block, document);
    /* move newly created table before the blockquote (to preserve the order of multiple quotes) */
    surroundingBQ.before(table);
    /* add surroundingBQ to clean-up list */
    if (!surroundingBQs.includes(surroundingBQ)) {
      surroundingBQs.push(surroundingBQ);
    }
  });
  /* finally: remove all surrounding blockquotes */
  surroundingBQs.forEach((surroundingBQ) => {
    surroundingBQ.remove();
  });
}

/* Quote type 3: https://news.sap.com/2023/02/international-womens-day-2023-empathy-is-our-superpower-to-embrace-equity/ */
function handleQuoteType3(main, document) {
  main.querySelectorAll('p.lead:has(+ p em)').forEach((quoteTextElem) => {
    const qText = cleanQuoteText(quoteTextElem.innerHTML);
    const quoteSourceElem = quoteTextElem.nextElementSibling.firstElementChild;
    const qSource = cleanQuoteSource(quoteSourceElem.innerHTML);
    const table = WebImporter.DOMUtils.createTable([['Quote'], [qText], [qSource]], document);
    quoteTextElem.replaceWith(table);
    quoteSourceElem.remove();
  });
}

/* Insights Quote https://www.sap.com/insights/viewpoints/giving-ai-a-moral-compass.html */
function handleInsightsQuote(main, document) {
  main.querySelectorAll('span.doubleQuote').forEach((quoteTextElem) => {
    const quoteWrapper = quoteTextElem.closest('div');
    const quote = [[quoteTextElem.textContent]];

    const qSource = quoteWrapper.querySelector('i')?.textContent;
    if (qSource) {
      quote.push([qSource]);
    }

    const table = WebImporter.DOMUtils.createTable([['Quote'], ...quote], document);
    quoteWrapper.replaceWith(table);
  });
}

const transformQuote = (main, document) => {
  handleQuoteType1(main, document);
  handleQuoteType2(main, document);
  handleQuoteType3(main, document);
  handleInsightsQuote(main, document);
};
export default transformQuote;
