/* global WebImporter */
const createBlogCtaBanner = (main, document) => {
  const banners = document.querySelectorAll('.wp-block-sap-news-cta-banner');
  banners.forEach((banner) => {
    const block = [['Promo'], [banner.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    banner.replaceWith(table);
  });
};
export default createBlogCtaBanner;
