import { span } from '../../scripts/dom-builder.js';

/**
 * @param link {Element} The link element
 */
function moveLinkTextNodeToSpan(link) {
  Array.from(link.childNodes)
    .forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
        const spanElement = span();
        const textNode = node.cloneNode(true);
        spanElement.appendChild(textNode);
        link.replaceChild(spanElement, node);
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
