/* global WebImporter */
const transformMoreSection = (main) => {
  // news
  const moreSection = main.querySelector('div#more-posts');
  if (moreSection) {
    const moreSectionCards = moreSection.querySelector('section.more-posts');
    if (moreSectionCards) {
      const block = [['Related Articles']];
      const table = WebImporter.DOMUtils.createTable(block, document);
      moreSectionCards.replaceWith(table);
    }

    moreSection.before(document.createElement('hr'));

    const docFooterMetadata = [['Section Metadata'], ['location', 'document-footer']];
    const docFooterMetaTable = WebImporter.DOMUtils.createTable(docFooterMetadata, document);
    moreSection.after(docFooterMetaTable);
  }

  // insights
  main.querySelectorAll('div.section').forEach((readMoreWrapper) => {
    if (readMoreWrapper.querySelector('h2')?.textContent.indexOf('Further reading') > -1) {
      const container = document.createElement('div');
      container.append(document.createElement('hr'), readMoreWrapper.querySelector('h2'));

      const block = [['Related Articles']];
      const table = WebImporter.DOMUtils.createTable(block, document);
      container.append(table);

      const docFooterMetadata = [['Section Metadata'], ['location', 'document-footer']];
      const docFooterMetaTable = WebImporter.DOMUtils.createTable(docFooterMetadata, document);
      container.append(docFooterMetaTable);
      readMoreWrapper.replaceWith(container);
    }
  });
};
export default transformMoreSection;
