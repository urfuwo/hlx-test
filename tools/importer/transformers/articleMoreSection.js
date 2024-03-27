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

      // get social and author profile in here first
      const socialHeading = document.createElement('h2');
      socialHeading.textContent = 'Share on social media';
      const socialTable = WebImporter.DOMUtils.createTable([['Social']], document);
      container.append(socialHeading, socialTable);

      const tagsHeading = document.createElement('h2');
      tagsHeading.textContent = 'Explore related content by tags';

      const tagTable = WebImporter.DOMUtils.createTable([['Article Tags']], document);
      container.append(tagsHeading, tagTable);

      const authorProfileTable = WebImporter.DOMUtils.createTable([['Author Profile']], document);
      container.append(authorProfileTable);

      // append related articles
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
