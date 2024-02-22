import {
  div,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const quoteTextBlock = block.querySelector(':scope > div:first-of-type');
  const quoteSourceBlock = block.querySelector(':scope > div:nth-of-type(2)');
  block.innerHTML = '';

  const quoteTextContainer = div({ class: 'col content' });
  quoteTextContainer.append(...quoteTextBlock.childNodes);

  const quoteSourceContainer = div({ class: 'col content' });
  quoteSourceContainer.append(...quoteSourceBlock.childNodes);

  // quoteText row
  const qtRow = div(
    { class: 'row' },
    div({ class: 'col qmcol oqm' }),
    quoteTextContainer,
    div({ class: 'col qmcol cqm' }),
  );
  block.append(qtRow);

  // quoteSource row
  const qsRow = div(
    { class: 'row' },
    div({ class: 'col qmcol' }),
    quoteSourceContainer,
    div({ class: 'col qmcol' }),
  );
  block.append(qsRow);
}
