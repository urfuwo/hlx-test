/* global WebImporter */

const NEWSLETTER_FILTER = /\b(subscribe|newsletter)\b/i;

const createBlogCtaBanner = (main, document) => {
  const banners = document.querySelectorAll('.wp-block-sap-news-cta-banner');
  banners.forEach((banner) => {
    if (NEWSLETTER_FILTER.test(banner.textContent)) {
      const block = [['Newsletter'], [banner.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      banner.remove();
      document.querySelector('div#page').append(table);
    } else {
      const name = banner.classList.contains('alignleft') ? 'Promo (blue)' : 'Promo';
      const block = [[name], [banner.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      banner.replaceWith(table);
    }
  });
};
export default createBlogCtaBanner;
