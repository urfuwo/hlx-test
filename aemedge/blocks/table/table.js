import {
  thead, tbody, table, tr,
} from '../../scripts/dom-builder.js';

function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const tableEl = table();
  const theadEl = thead();
  const tbodyEl = tbody();

  const header = !block.classList.contains('no-header');
  if (header) {
    tableEl.append(theadEl);
  }
  tableEl.append(tbodyEl);

  [...block.children].forEach((child, i) => {
    const trEl = tr();
    if (header && i === 0) theadEl.append(trEl);
    else tbodyEl.append(trEl);
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      cell.innerHTML = col.innerHTML;
      trEl.append(cell);
    });
  });
  block.innerHTML = '';
  block.append(tableEl);
}
