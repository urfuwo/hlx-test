const articleTable = (main, document) => {
  // insights
  main.querySelectorAll('table.table').forEach((table) => {
    const tableWrapper = table.closest('[class^="Table__root--"]');

    // get number of columns
    const numCols = table.rows[0]
      ? [...table.rows[0].cells].reduce((cols, cell) => cols + cell.colSpan, 0)
      : 0;

    // create block table head row
    const tr = table.insertRow(0);
    const th = document.createElement('th');
    th.textContent = 'Table';
    th.setAttribute('colspan', numCols);
    tr.append(th);
    tableWrapper.replaceWith(table);
  });
};

export default articleTable;
