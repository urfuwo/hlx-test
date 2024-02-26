import {
  h2, ol, li, span, a, aside,
} from '../../scripts/dom-builder.js';

function setActiveLink() {
  const links = document.querySelectorAll('.toc li');
  links.forEach((link) => {
    const linkHash = link.querySelector('a')?.hash;
    if (linkHash === window.location.hash) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.setAttribute('aria-current', 'false');
    }
  });
}

export default async function decorate(block) {
  const mainContent = document.querySelector('main > :nth-child(3)');
  const headers = mainContent?.querySelectorAll('h2, h3');
  if (headers.length > 0) {
    const tocElement = aside({ class: 'toc' }, h2('What\'s on this page'));
    const tocList = ol();
    headers.forEach((header) => {
      const entry = li(
        span(),
        a({
          href: `#${header.id}`,
          class: `toc-${header.tagName.toLowerCase()}`,
        }, header.innerText),
      );
      tocList.appendChild(entry);
    });
    tocElement.appendChild(tocList);
    block.append(tocElement);
    window.addEventListener('load', setActiveLink);
    window.addEventListener('hashchange', setActiveLink);
  }
}
