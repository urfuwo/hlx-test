/**
 * Link List Block
 */

/**
 * Replace the `img` (icon) element with the referenced SVG element.
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

/**
 * Wrap the text node of a link with a `span` element.
 * (!) Text node can also be positioned before the icon.
 * @param link {Element} The link element
 */
function moveLinkTextNodeToSpan(link) {
  Array.from(link.childNodes)
    .forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
        const span = document.createElement('span');
        span.classList.add('button-text');
        const textNode = node.cloneNode(true);
        span.appendChild(textNode);
        link.replaceChild(span, node);
      }
    });
}

export default function decorate(block) {
  [...block.children].forEach((entry) => {
    const iconImg = entry.querySelector('span.icon img');
    const link = entry.querySelector('div a.button');
    if (link) {
      moveLinkTextNodeToSpan(link);
    }
    if (iconImg) {
      replaceIconImgWithSvg(iconImg);
    }
  });
}
