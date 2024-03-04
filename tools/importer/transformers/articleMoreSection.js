/* global WebImporter */
const transformMoreSection = (main) => {
  const moreSection = main.querySelector('div#more-posts');
  if (moreSection) {
    const moreSectionCards = moreSection.querySelector('section.more-posts');
    if (moreSectionCards) {
      const block = [['Related Articles']];
      const table = WebImporter.DOMUtils.createTable(block, document);
      moreSectionCards.replaceWith(table);
    }

    // const sidebarMetadata = [['Section Metadata'], ['location', 'document-footer']];
    // const sidebarMetaTable = WebImporter.DOMUtils.createTable(sidebarMetadata, document);
    // moreSection.before(document.createElement('hr'), sidebarMetaTable, document.createElement('hr'));

    moreSection.before(document.createElement('hr'));

    const docFooterMetadata = [['Section Metadata'], ['location', 'document-footer']];
    const docFooterMetaTable = WebImporter.DOMUtils.createTable(docFooterMetadata, document);
    moreSection.after(docFooterMetaTable);
  }
};
export default transformMoreSection;
