import {
  div,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const quoteTextBlock = block.querySelector(':scope > div:first-of-type');
  const quoteSourceBlock = block.querySelector(':scope > div:nth-of-type(2)');
  block.innerHTML = '';

  const quoteTextContainer = div({ class: 'block content' });
  quoteTextContainer.append(...quoteTextBlock.childNodes);

  const quoteSourceContainer = div({ class: 'block content' });
  quoteSourceContainer.append(...quoteSourceBlock.childNodes);

  // quoteText row
  const qtRow = div(
    { class: 'row' },
    div({ class: 'block qmcolumn opening-quotationmark' }),
    quoteTextContainer,
    div({ class: 'block qmcolumn closing-quotationmark' }),
  );
  block.append(qtRow);

  // quoteSource row
  const qsRow = div(
    { class: 'row' },
    div({ class: 'block qmcolumn' }),
    quoteSourceContainer,
    div({ class: 'block qmcolumn' }),
  );
  block.append(qsRow);
}
