/**
 * Unwraps lightbox images by replacing the parent anchor element with the image element.
 * @param {HTMLElement} main - The main element containing the images.
 */
export default function unwrapLightboxImages(main) {
  main.querySelectorAll('figure.wp-block-image img').forEach((img) => {
    const parent = img.parentElement;
    if (parent.tagName === 'A' && parent.href.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null) {
      parent.replaceWith(img);
    }
  });
}
