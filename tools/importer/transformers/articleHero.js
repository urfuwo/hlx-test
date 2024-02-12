/* global WebImporter */
const transformHero = (main, document) => {
  const hero = document.querySelector('.c-hero');
  if (hero) {
    // clean up hero stuff
    hero.querySelectorAll('.social-share-list, .c-post-type, .c-entry-meta').forEach((el) => el.remove());

    // map hero content
    const content = hero.querySelector('article');

    // unwrap hero image
    const heroImage = content.querySelector('a.c-post-link-wrapper img');
    if (heroImage) {
      heroImage.closest('a').replaceWith(heroImage);
    }

    const block = [['Hero'], [content.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    hero.replaceWith(table);
  }
};
export default transformHero;
