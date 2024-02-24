import { div } from '../../scripts/dom-builder.js';

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
  const tocFlag = document.querySelector('meta[name="toc"]');
  if (tocFlag && tocFlag.content !== 'no' && tocFlag.content !== 'false') {
    const tocSection = document.createElement('div');
    const tocBlock = document.createElement('div');
    tocSection.classList.add('toc-container');
    tocBlock.classList.add('toc');
    tocSection.appendChild(tocBlock);
    main.insertBefore(tocSection, document.querySelector('main > :nth-child(2)'));
  }
}

decorate(document);
