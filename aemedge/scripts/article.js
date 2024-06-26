import { getMetadata, toClassName } from './aem.js';
import ffetch from './ffetch.js';

function completeEntry(entry) {
  if (!entry) { return null; }
  let { description } = entry;
  if (!description) {
    if (entry.title) {
      description = entry.title;
      if (entry.author && entry.title.startsWith(`${entry.author}, `)) {
        description = entry.title.substring(entry.author.length + 2);
      }
    } else {
      description = '';
    }
  }
  entry.description = description;
  return entry;
}

async function getAuthorEntries(keys) {
  const entryFilter = ((entry) => (keys.includes(entry.path) || keys.includes(entry.author)));
  const unsortedEntries = await ffetch(`${window.hlx.codeBasePath}/authors-index.json`, 'sapContentHubAuthorEntries').filter(entryFilter).limit(keys.length).all();
  const sortedEntries = [];
  if (unsortedEntries) {
    keys.forEach((key) => {
      const c = completeEntry(unsortedEntries.find(
        (entry) => (key === entry.path) || key.includes(entry.author),
      ));
      if (c) {
        sortedEntries.push(c);
      }
    });
  }
  return sortedEntries;
}

/* List of authorEntries of all articles, no duplicates */
async function allAuthorEntries(articleStream) {
  const authorSet = new Set();
  articleStream.forEach((article) => { authorSet.add(article.author); });
  return getAuthorEntries(Array.from(authorSet));
}

function buildAuthorUrl(author) {
  return `/author/${toClassName(author.trim()).replaceAll('-', '')}`;
}

function asEntry(authorName) {
  return (authorName === '0')
    ? null
    : { author: authorName, path: buildAuthorUrl(authorName) };
}

function authorEntryFromAuthor(author, authorEntries) {
  return authorEntries.find((e) => e.author === author) || asEntry(author);
}

/* AuthorEntry for the given article, or else fallback */
function authorEntry(article, authorEntries) {
  return authorEntryFromAuthor(article.author, authorEntries);
}

const defaultSuffixes = ['PhD', 'Ph.D.'];
function removeAuthorsSuffixes(authors, suffixes = defaultSuffixes) {
  if (!authors) {
    return '';
  }
  let authorsWithoutSuffixes = authors;
  suffixes.forEach((suffix) => {
    authorsWithoutSuffixes = authorsWithoutSuffixes.replaceAll(new RegExp(`,*\\s*${suffix}(?=,|$)`, 'g'), '');
  });
  return authorsWithoutSuffixes;
}

function getAuthorNames() {
  return removeAuthorsSuffixes(getMetadata('author')).split(',').map((e) => e.trim());
}

export {
  allAuthorEntries,
  authorEntry,
  authorEntryFromAuthor,
  getAuthorEntries,
  buildAuthorUrl,
  removeAuthorsSuffixes,
  getAuthorNames,
};
