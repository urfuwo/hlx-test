import { div } from './dom-builder.js';

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
    authorsWithoutSuffixes = authorsWithoutSuffixes.replace(new RegExp(`,*\\s*${suffix}(?=,|$)`), '');
  });
  return authorsWithoutSuffixes;
}

export { formatDate, containerize, removeAuthorsSuffixes };
