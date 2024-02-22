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
}

decorate(document);
