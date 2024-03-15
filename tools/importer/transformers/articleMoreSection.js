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

    moreSection.before(document.createElement('hr'));

    const docFooterMetadata = [['Section Metadata'], ['location', 'document-footer']];
    const docFooterMetaTable = WebImporter.DOMUtils.createTable(docFooterMetadata, document);
    moreSection.after(docFooterMetaTable);
  }
};
export default transformMoreSection;
