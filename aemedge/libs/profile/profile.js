import { createOptimizedPicture, decorateIcons, toClassName } from '../../scripts/aem.js';
import {
  div, h2, p, a, span,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';

const breakpoints = [
  { width: '480' },
];

function extractAuthorDescription(entry) {
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
  return description;
}

function asEntry(authorName) {
  return { author: authorName, path: `/author/${toClassName(authorName).replace('-', '')}` };
}

function completeEntry(entry) {
  const result = (!entry) ? { path: '/author/name', author: 'Name' } : entry;
  result.description = extractAuthorDescription(result);
  return result;
}

async function getAuthorEntries(keys) {
  const entryFilter = ((entry) => (keys.includes(entry.path) || keys.includes(entry.author)));
  const unsortedEntries = await ffetch(`${window.hlx.codeBasePath}/authors-index.json`).filter(entryFilter).limit(keys.length).all();
  const sortedEntries = [];
  if (unsortedEntries) {
    keys.forEach((key) => {
      sortedEntries.push(completeEntry(unsortedEntries.find(
        (entry) => (key === entry.path) || key.includes(entry.author),
      )));
    });
  }
  return sortedEntries;
}

function renderProfile(entry, asAvatar = false) {
  if (!entry) return null;
  const authorImage = entry.image
    ? createOptimizedPicture(entry.image, entry.author, false, breakpoints) : null;
  const authorProfile = asAvatar
    ? div(
      div({ class: 'avatar' }, authorImage ? div(authorImage) : div()),
      div(
        span({ class: 'author' }, a({ href: entry.path }, span(`${entry.author}`))),
        span({ class: 'info' }, entry.description),
      ),
    )
    : div(
      div({ class: 'avatar' }, authorImage ? div(authorImage) : div()),
      div(
        { class: 'details' },
        h2(entry.author),
        p(entry.description),
        p(
          { class: 'link' },
          a({ href: entry.path, 'aria-label': 'Read more' }, 'See more by this author'),
          span({ class: 'icon icon-link-arrow' }),
        ),
      ),
    );
  decorateIcons(authorProfile);
  return authorProfile;
}

export {
  asEntry,
  completeEntry,
  renderProfile,
  getAuthorEntries,
};
