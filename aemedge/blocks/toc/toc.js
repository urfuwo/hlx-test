import {
  h2, ol, li, span, a, aside, div,
} from '../../scripts/dom-builder.js';
import { fetchPlaceholders, getMetadata, toCamelCase } from '../../scripts/aem.js';

function setActiveLink() {
  const links = document.querySelectorAll('.toc li');
  links.forEach((link) => {
    const anchor = link.querySelector('a');
    const linkHash = anchor?.hash;
    const isH3 = anchor?.classList.contains('toc-h3');
    const linkMatch = linkHash === window.location.hash;
    if (linkMatch) {
      link.setAttribute('aria-current', 'true');
      if (isH3) {
        link.closest('.toc__list-item.parent').classList.add('expanded');
      } else if (link.classList.contains('parent')) {
        link.classList.add('expanded');
      }
    } else {
      link.setAttribute('aria-current', 'false');
      link.classList.remove('expanded');
    }
  });
}

function buildListItemLink(header) {
  return a({
    href: `#${header.id}`,
    class: `toc-${header.tagName.toLowerCase()}`,
  }, header.innerText);
}

function buildListItemContent(header) {
  return div(
    { class: 'toc__list-item__content' },
    span(),
    buildListItemLink(header),
  );
}

function buildListItem(header, subheaders) {
  const hasSubheaders = subheaders && subheaders.length > 0;
  return li(
    { class: `toc__list-item ${hasSubheaders ? 'parent' : ''}` },
    buildListItemContent(header),
    hasSubheaders ? ol(
      { class: 'toc__list' },
      ...subheaders.map(
        (subheader) => li(
          { class: 'toc__list-item' },
          buildListItemContent(subheader),
        ),
      ),
    ) : '',
  );
}

function buildList(headers) {
  const tocList = ol({ class: 'toc__list' });
  let currentParentHeader;
  let subheaders = [];
  headers.forEach((header, index) => {
    const isH2 = header.tagName === 'H2';
    if (isH2 && currentParentHeader) {
      tocList.appendChild(buildListItem(currentParentHeader, subheaders));
      currentParentHeader = header;
      subheaders = [];
    } else if (isH2) {
      currentParentHeader = header;
    } else {
      subheaders.push(header);
    }
    if (index === headers.length - 1) {
      tocList.appendChild(buildListItem(currentParentHeader, subheaders));
    }
  });
  return tocList;
}

export default async function decorate(block) {
  const mainContent = document.querySelectorAll(
    'main > .section:not(.hero-container, .toc-container, .section[data-location="sidebar"], .section[data-location="document-footer"]) .default-content-wrapper',
  );
  const headers = mainContent ? Array.from(mainContent).reduce((acc, currentSection) => {
    acc.push(...currentSection.querySelectorAll('h2, h3'));
    return acc;
  }, []) : [];
  if (headers.length > 0) {
    const placeholders = await fetchPlaceholders();
    const tocElement = aside(
      { class: 'toc' },
      h2(getMetadata('toc-heading') || placeholders[toCamelCase('toc-heading')]),
      buildList(headers),
    );
    block.append(tocElement);
    setActiveLink();
    window.addEventListener('hashchange', setActiveLink);
  }
}
