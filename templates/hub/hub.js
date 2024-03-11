import { containerize } from '../../scripts/utils.js';
import { aside } from '../../scripts/dom-builder.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  containerize(main, '.hero');
  main.parentNode.insertBefore(aside(), main);
}

decorate(document);
