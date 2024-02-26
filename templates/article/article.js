import { div } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

function restructureArticle(container, targetClass) {
  const target = container.querySelector(targetClass);
  if (target.nextElementSibling) {
    const wrapperDiv = div();
    wrapperDiv.appendChild(target);
    container.insertBefore(wrapperDiv, container.firstChild);
  }
}

function decorate(doc) {
  const main = doc.querySelector('main');
  restructureArticle(main, '.hero');
  const tocFlag = getMetadata('toc');
  if (tocFlag && tocFlag.content !== 'no' && tocFlag.content !== 'false') {
    const tocSection = div({ class: 'toc-container' }, div({ class: 'toc' }));
    main.insertBefore(tocSection, doc.querySelector('main > :nth-child(2)'));
  }
}

decorate(document);
