import {
  h2, ol, li, span, a, aside, div, button,
} from '../../scripts/dom-builder.js';
import { fetchPlaceholders, getMetadata, toCamelCase } from '../../scripts/aem.js';

function setActiveLink() {
  const selected = document.querySelector('.toc .toc__selected');
  const selectedLabel = selected.querySelector('span');
  selected.setAttribute('aria-expanded', 'false');

  const links = document.querySelectorAll('.toc li');
  links.forEach((link) => {
    const anchor = link.querySelector('a');
    const linkHash = anchor?.hash;
    const isH3 = anchor?.classList.contains('toc__h3-link');
    const linkMatch = linkHash === window.location.hash;
    if (linkMatch) {
      selectedLabel.innerHTML = anchor.innerText;
      link.setAttribute('aria-current', 'true');
      if (isH3) {
        link.closest('.toc__list-item.parent').setAttribute('aria-expanded', 'true');
      } else if (link.classList.contains('parent')) {
        link.setAttribute('aria-expanded', 'true');
      }
    } else {
      link.setAttribute('aria-current', 'false');
      link.setAttribute('aria-expanded', 'false');
    }
  });
}

function buildListItemLink(header) {
  return a({
    href: `#${header.id}`,
    class: `toc__${header.tagName.toLowerCase()}-link`,
  }, header.innerText);
}

function buildListItemContent(header) {
  return div(
    { class: 'toc__list-item__content' },
    span({ class: 'toc__list-item__spacer' }),
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
  const tocList = ol({ class: 'toc__list', id: 'toc' });
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

function addClickHandlerToSelectedItem(selected) {
  selected.addEventListener('click', () => {
    const listHidden = selected.getAttribute('aria-expanded') === 'false';
    if (listHidden) {
      selected.setAttribute('aria-expanded', 'true');
    } else {
      selected.setAttribute('aria-expanded', 'false');
    }
  });
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
    const heading = getMetadata('toc-heading') || placeholders[toCamelCase('toc-heading')];
    const selected = button({
      class: 'toc__selected', 'aria-expanded': 'false', 'aria-haspopup': 'true', 'aria-controls': 'toc', 'aria-label': 'Table of Contents',
    }, span(heading));
    const tocElement = aside(
      {
        class: 'toc', role: 'navigation', 'aria-label': 'In page',
      },
      h2(heading),
      selected,
      buildList(headers),
    );
    block.append(tocElement);
    setActiveLink();
    addClickHandlerToSelectedItem(selected);
    window.addEventListener('hashchange', setActiveLink);
  }
}
