import {
  createOptimizedPicture,
  getMetadata,
} from '../../scripts/aem.js';
import {
  div, h2, p, a, span, img,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';

const AUTHOR_INDEX = '/authors-index.json';

const breakpoints = [
  { media: '(min-width: 980px)', width: '2000' },
  { width: '750' },
];

async function getAuthorDetails() {
  // #todo: handle multiple authors
  const name = getMetadata('author');
  const result = await ffetch(AUTHOR_INDEX).filter((entry) => entry.author === name).limit(1).all();
  if (!result || result.length < 1) {
    return null;
  }
  const elem = result[0];
  if (!elem.description) {
    elem.description = 'Head of Something';
  }
  return elem;
}

export default async function decorate(block) {
  const details = await getAuthorDetails();
  const authorName = details.author;
  const authorDescription = details.description;
  const authorPage = details.path;
  const authorImage = createOptimizedPicture(details.image, authorName, false, breakpoints);
  const authorProfile = div(
    div({ class: 'avatar' }, div(authorImage)),
    div(
      { class: 'details' },
      h2(authorName),
      p(authorDescription),
      p(
        { class: 'link' },
        a({ href: authorPage, 'aria-label': 'Read more' }, 'See more by this author'),
        span(
          { class: ['icon', 'icon-link-arrow'] },
          img(
            { src: '/icons/link-arrow.svg' },
          ),
        ),
      ),
    ),
  );
  block.append(authorProfile);
}
