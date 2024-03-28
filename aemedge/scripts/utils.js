import { div } from './dom-builder.js';
import { toClassName } from './aem.js';

function formatDate(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
}

function containerize(container, targetClass) {
  const target = container.querySelector(targetClass);
  if (target && target.nextElementSibling) {
    const wrapperDiv = div();
    wrapperDiv.appendChild(target);
    container.insertBefore(wrapperDiv, container.firstChild);
  }
}

const defaultSuffixes = ['PhD', 'Ph.D.'];
function removeAuthorsSuffixes(authors, suffixes = defaultSuffixes) {
  if (!authors) {
    return '';
  }
  let authorsWithoutSuffixes = authors;
  suffixes.forEach((suffix) => {
    /**
     * Jane Doe, PhD,
     * Jane Doe, PhD{eol}
     * Jane Doe PhD,
     * Jane Doe PhD{eol}
     * Jane Doe, Ph.D.,
     * Jane Doe, Ph.D.{eol}
     * Jane Doe Ph.D.,
     * Jane Doe Ph.D.{eol}
     */
    authorsWithoutSuffixes = authorsWithoutSuffixes.replaceAll(new RegExp(`,*\\s*${suffix}(?=,|$)`, 'g'), '');
  });
  return authorsWithoutSuffixes;
}

function buildAuthorUrl(author) {
  return `/author/${toClassName(author.trim()).replaceAll('-', '')}`;
}

export {
  formatDate, containerize, removeAuthorsSuffixes, buildAuthorUrl,
};
