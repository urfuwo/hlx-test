/* global WebImporter */
const transformArticleContentFooter = (main, document) => {
  const contentFooter = main.querySelector('div.entry-footer');
  if (contentFooter) {
    const socialHeading = document.createElement('h2');
    socialHeading.textContent = 'Share on social media';
    contentFooter.insertBefore(socialHeading, contentFooter.firstChild);
    const socialTable = WebImporter.DOMUtils.createTable([['Social']], document);
    socialHeading.after(socialTable);

    const tagLinks = contentFooter.querySelector('span.tags-links');
    if (tagLinks) {
      const tagsHeading = document.createElement('h2');
      tagsHeading.textContent = 'Explore related content by tags';
      tagLinks.before(tagsHeading);

      const tagTable = WebImporter.DOMUtils.createTable([['Article Tags']], document);
      tagLinks.replaceWith(tagTable);
    }

    const authorTable = WebImporter.DOMUtils.createTable([['Author Profile']], document);
    contentFooter.append(authorTable);
  }
};
export default transformArticleContentFooter;
