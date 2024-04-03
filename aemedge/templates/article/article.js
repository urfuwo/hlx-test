import { div, domEl } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import { buildArticleSchema } from '../../scripts/schema.js';
import { containerize } from '../../scripts/utils.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  containerize(main, '.hero');
  const tocFlag = getMetadata('toc');
  if (tocFlag && tocFlag.content !== 'no' && tocFlag.content !== 'false') {
    const tocSection = div({ class: 'toc-container' }, div({ class: 'toc' }));
    main.insertBefore(tocSection, doc.querySelector('main > :nth-child(2)'));
  }

  // Wrap images and captions in common container for sizing
  const pictures = doc.querySelectorAll('main > div > p > picture');
  pictures.forEach((pictureEl) => {
    const parent = pictureEl.parentElement;
    const { nextElementSibling } = parent;
    const isCaption = nextElementSibling?.tagName.toLowerCase() === 'p'
      && nextElementSibling.firstElementChild?.tagName.toLowerCase() === 'em';

    if (isCaption) {
      const container = domEl(
        'figure',
        { class: 'picture-container' },
        pictureEl,
        domEl(
          'figcaption',
          { class: 'picture-caption' },
          nextElementSibling.firstElementChild,
        ),
      );
      parent.append(container);
    }
  });

  buildArticleSchema();
}

decorate(document);
