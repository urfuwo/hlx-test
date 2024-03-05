import {
  createOptimizedPicture, decorateIcons,
  getMetadata,
} from '../../scripts/aem.js';
import {
  div, h2, p, a, span,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';

const breakpoints = [
  { width: '120' },
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
      description = 'Author';
    }
  }
  return description;
}

function completeEntry(entry) {
  const result = (!entry) ? { path: '/author/name', author: 'Name' } : entry;
  result.description = extractAuthorDescription(result);
  return result;
}

async function getAuthorEntry(entryFilter) {
  const result = await ffetch('/authors-index.json').filter(entryFilter).limit(1).all();
  return completeEntry((!result || result.length < 1) ? null : result[0]);
}

function renderProfile(entry) {
  const authorImage = entry.image
    ? createOptimizedPicture(entry.image, entry.author, false, breakpoints) : null;
  const authorProfile = div(
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

export default async function decorate(block) {
  // #todo: handle multiple authors
  const name = getMetadata('author');
  const entryFilter = ((entry) => entry.author === name);
  const entry = await getAuthorEntry(entryFilter);
  const authorProfile = await renderProfile(entry);
  block.classList.add('ver');
  block.append(authorProfile);
}

export {
  decorate,
  renderProfile,
  completeEntry,
};
