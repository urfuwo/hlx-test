/**
 * Unwraps lightbox images by replacing the parent anchor element with the image element.
 * @param {HTMLElement} main - The main element containing the images.
 * @param {HTMLDocument} document - The document
 */
export default function unwrapLightboxImages(main, document) {
  main.querySelectorAll('figure.wp-block-image').forEach((figure) => {
    const caption = figure.querySelector('figcaption');
    if (caption) {
      const captionWrapper = document.createElement('em');
      captionWrapper.textContent = caption.textContent;
      figure.after(captionWrapper);
      caption.remove();
    }
    const img = figure.querySelector('img');
    const parent = img?.parentElement;
    if (parent.tagName === 'A' && parent.href.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null) {
      parent.replaceWith(img);
    }
  });
}
