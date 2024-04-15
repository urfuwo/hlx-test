/**
 * Link List Block
 */

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
    const link = entry.querySelector('div a.button');
    if (link) {
      moveLinkTextNodeToSpan(link);
    }
  });
}
