/* global WebImporter */
// If image has Click to Enlarge as the caption
// transform it into a Lightbox table
const transformLightboxImages = (main, document) => {
  main.querySelectorAll('figure.wp-block-image').forEach((figure) => {
    const caption = figure.querySelector('figcaption');
    const captionText = caption.textContent;
    const imageCanBeEnlarged = captionText.includes('Click to enlarge');

    if (imageCanBeEnlarged) {
      const block = [['Lightbox'], [figure.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      figure.replaceWith(table);
    }
  });
};
export default transformLightboxImages;
