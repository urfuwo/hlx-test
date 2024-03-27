/**
 * Clean up AEM DM image source to get the bigger resolution images.
 * @param {HTMLElement} main - The main element containing the images.
 */
export default function cleanUpImgSrc(main) {
  main.querySelectorAll('img').forEach((img) => {
    const src = img.src.split('?')[0];
    img.src = src;
  });
}
