/* global WebImporter */
const createBlogCtaBanner = (main, document) => {
  const banners = document.querySelectorAll('.wp-block-sap-news-cta-banner');
  banners.forEach((banner) => {
    let blockName = 'Blog CTA Banner';
    if (banner.classList.contains('alignleft')) blockName = 'Blog CTA Banner (alignleft)';

    const block = [[blockName], [banner.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    banner.replaceWith(table);
  });
};
export default createBlogCtaBanner;
