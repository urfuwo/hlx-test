import {
  div,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const qtContent = block.querySelector(':scope > div:first-of-type > div');
  qtContent.classList.add('col', 'content');

  const qsContent = block.querySelector(':scope > div:nth-of-type(2) > div');
  qsContent.classList.add('col', 'content');

  qtContent.parentNode.classList.add('qt');
  qtContent.before(div({ class: 'col qmcol oqm' }));
  qtContent.after(div({ class: 'col qmcol cqm' }));

  qsContent.parentNode.classList.add('qs');
}
