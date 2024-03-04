import { div } from '../../scripts/dom-builder.js';
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

  buildArticleSchema();
}

decorate(document);
