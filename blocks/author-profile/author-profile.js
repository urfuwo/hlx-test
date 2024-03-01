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

function extractAuthorDescription(details) {
  let { description } = details;
  if (!description) {
    if (details.title) {
      description = details.title;
      if (details.author && details.title.startsWith(`${details.author}, `)) {
        description = details.title.substring(details.author.length + 2);
      }
    } else {
      description = 'Author';
    }
  }
  return description;
}

async function getAuthorDetails() {
  // #todo: handle multiple authors
  const name = getMetadata('author');
  const result = name
    ? await ffetch('/authors-index.json').filter((entry) => entry.author === name).limit(1).all() : null;
  const details = (!result || result.length < 1)
    ? { path: '/author/name', author: 'Name' } : result[0];
  details.description = extractAuthorDescription(details);
  return details;
}

export default async function decorate(block) {
  const details = await getAuthorDetails();
  const authorImage = details.image
    ? createOptimizedPicture(details.image, details.author, false, breakpoints) : null;
  const authorProfile = div(
    div({ class: 'avatar' }, authorImage ? div(authorImage) : div()),
    div(
      { class: 'details' },
      h2(details.author),
      p(details.description),
      p(
        { class: 'link' },
        a({ href: details.path, 'aria-label': 'Read more' }, 'See more by this author'),
        span({ class: 'icon icon-link-arrow' }),
      ),
    ),
  );
  decorateIcons(authorProfile);
  block.append(authorProfile);
}
