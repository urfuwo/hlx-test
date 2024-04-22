import { getMetadata, toCamelCase } from './aem.js';
import { div } from './dom-builder.js';

function formatDate(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
}

function isWhitespaceNode(node) {
  return node.nodeName === '#text' && node.textContent.trim().length === 0;
}

function containerize(container, targetClass) {
  const target = container.querySelector(targetClass);
  if (target && target.nextElementSibling) {
    const parent = target.parentElement;
    const sectionMetadata = target.parentElement.querySelector(':scope > .section-metadata');
    const wrapperDiv = div({}, target, sectionMetadata || '');
    container.insertBefore(wrapperDiv, container.firstChild);
    if (!parent.hasChildNodes()
      || Array.from(parent.childNodes).every((node) => isWhitespaceNode(node))) {
      parent.remove();
    }
  }
}

async function fetchTagList(prefix = 'default') {
  window.tags = window.tags || {};
  if (!window.tags[prefix]) {
    window.tags[prefix] = new Promise((resolve) => {
      fetch(`${prefix === 'default' ? '/aemedge' : prefix}/tagging-contenthub.json`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          return {};
        })
        .then((json) => {
          const tags = {};
          json.data
            .filter((tag) => tag.key)
            .forEach((tag) => {
              tags[toCamelCase(tag.key)] = tag;
            });
          window.tags[prefix] = tags;
          resolve(window.tags[prefix]);
        })
        .catch(() => {
          // error loading placeholders
          window.tags[prefix] = {};
          resolve(window.tags[prefix]);
        });
    });
  }
  return window.tags[`${prefix}`];
}

function getContentType() {
  const tags = getMetadata('article:tag').split(', ');
  return tags.find((tag) => tag.trim().toLowerCase().startsWith('content-type'));
}

export {
  formatDate, containerize, fetchTagList, getContentType,
};
