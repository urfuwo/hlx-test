import { nav } from '../../scripts/dom-builder.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  const mainNavContainer = nav();
  main.parentNode.insertBefore(mainNavContainer, main);
  console.log('Decorating web-component template', doc);
}

decorate(document);
