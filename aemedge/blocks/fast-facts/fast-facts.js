import {
  div, li, span, ul,
} from '../../scripts/dom-builder.js';

export default async function decorateBlock(block) {
  const oddCount = block.childElementCount % 2 !== 0;
  const factsList = ul({ class: `fast-facts-items ${oddCount ? 'odd-count' : 'even-count'}` });
  [...block.children].forEach((row) => {
    const eyebrow = row.querySelector('h6')?.textContent || '';
    const factMain = row.querySelector('h4')?.textContent || '';
    const factUnit = row.querySelector('h4 + h5')?.textContent || '';
    const headline = row.querySelector('em')?.textContent || '';
    const text = row.querySelector('p:not(:has(strong)):not(.button-container)')?.textContent || '';
    const link = row.querySelector('.button-container') || '';
    if (link) {
      link.classList.add('fast-facts-item__link');
    }

    const hasDetails = headline || text || eyebrow;

    row.remove();
    factsList.append(li(
      { class: 'fast-facts-item' },
      factMain ? div(
        { class: 'fast-facts-item__fact' },
        span({ class: 'fast-facts-item__fact-main' }, factMain),
        span({ class: 'fast-facts-item__fact-unit' }, factUnit),
      ) : '',
      hasDetails ? div(
        { class: 'fast-facts-item__details' },
        eyebrow ? div({ class: 'fast-facts-item__eyebrow' }, eyebrow) : '',
        headline ? div({ class: 'fast-facts-item__headline' }, headline) : '',
        text ? div({ class: 'fast-facts-item__text' }, text) : '',
      ) : '',
      link,
    ));
  });
  block.append(factsList);
}
