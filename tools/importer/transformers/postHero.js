/* global WebImporter */
const transformHero = (main, document) => {
  const hero = document.querySelector('.c-hero ');
  if (hero) {
    // clean up hero stuff
    hero.querySelectorAll('.social-share-list, .c-post-type, .c-entry-meta').forEach((el) => el.remove());

    // map hero content
    const content = hero.querySelector('article');
    let blockName = 'Hero';
    if (content.classList.contains('has-light-overlay')) blockName = 'Hero (light overlay)';
    if (content.classList.contains('has-dark-overlay')) blockName = 'Hero (dark overlay)';

    // unwrap hero image
    const heroImage = content.querySelector('a.c-post-link-wrapper img');
    if (heroImage) {
      heroImage.closest('a').replaceWith(heroImage);
    }

    const block = [[blockName], [content.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    hero.replaceWith(table);
  }
};
export default transformHero;
