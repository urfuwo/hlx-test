/* global WebImporter */
const transformHero = (main, document) => {
  const heroNews = document.querySelector('.c-hero');
  if (heroNews) {
    // clean up hero stuff
    heroNews.querySelectorAll('.social-share-list, .c-post-type, .c-entry-meta').forEach((el) => el.remove());

    // map hero content
    const content = heroNews.querySelector('article');

    // unwrap hero image
    const heroImage = content.querySelector('a.c-post-link-wrapper img');
    if (heroImage) {
      heroImage.closest('a').replaceWith(heroImage);
    }

    const block = [['Hero'], [content.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    heroNews.replaceWith(table);
  }

  const heroInsights = document.querySelector('.heroSpaceProductCategory');
  if (heroInsights) {
    const block = [['Hero'], [heroInsights.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    heroInsights.replaceWith(table);
  }
};
export default transformHero;
