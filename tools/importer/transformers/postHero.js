const transformHero = (main, document) => {
  const hero = document.querySelector('.c-hero ');
  if (hero) {
    // clean up hero stuff
    hero.querySelectorAll('.social-share-list, .c-post-type, .c-entry-meta').forEach((el) => el.remove());

    // unwrap hero image
    const heroImage = hero.querySelector('a.c-post-link-wrapper img');
    if (heroImage) {
      heroImage.closest('a').replaceWith(heroImage);
    }
  }
};
export default transformHero;
