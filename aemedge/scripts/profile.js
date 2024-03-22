import { createOptimizedPicture, decorateIcons } from './aem.js';
import {
  div, h2, p, a, span,
} from './dom-builder.js';

const breakpoints = [
  { width: '480' },
];

function renderProfile(entry, asAvatar = false) {
  if (!entry) return null;
  const authorImage = entry.image
    ? createOptimizedPicture(entry.image, entry.author, false, breakpoints) : null;
  const authorProfile = asAvatar
    ? div(
      div({ class: 'avatar' }, authorImage ? div(authorImage) : div()),
      div(
        { class: 'author-info' },
        span({ class: 'author' }, a({ href: entry.path }, span(`${entry.author}`))),
        entry.description ? span({ class: 'details' }, entry.description) : '',
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
  // eslint-disable-next-line import/prefer-default-export
  renderProfile,
};
