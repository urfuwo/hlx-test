/* global WebImporter */

const NEWSLETTER_FILTER = /\b(subscribe|newsletter)\b/i;

const createBlogCtaBanner = (main, document) => {
  const banners = document.querySelectorAll('.wp-block-sap-news-cta-banner');
  banners.forEach((banner) => {
    if (NEWSLETTER_FILTER.test(banner.textContent)) {
      banner.remove();
    } else {
      const block = [['Promo'], [banner.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      banner.replaceWith(table);
    }
  });
};
export default createBlogCtaBanner;
