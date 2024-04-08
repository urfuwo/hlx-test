/**
 * Link List Block
 */

/**
 * Replace an `img` (icon) element with an SVG element
 * @param img {Element} The `img` element to replace
 */
function replaceIconImgWithSvg(img) {
  const imgSrc = img.getAttribute('src');

  fetch(imgSrc)
    .then((response) => response.text())
    .then((data) => {
      // Create a container for the SVG
      const div = document.createElement('div');
      div.innerHTML = data;

      // Get the SVG element
      const svg = div.getElementsByTagName('svg')[0];

      // Get all path elements within the SVG
      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        path.removeAttribute('fill');
      });

      // Replace the img element with the SVG
      img.parentNode.replaceChild(svg, img);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
}

export default function decorate(block) {
  [...block.children].forEach((entry) => {
    const iconImg = entry.querySelector('span.icon img');
    if (iconImg) {
      replaceIconImgWithSvg(iconImg);
    }
  });
}
