import { containerize } from '../../scripts/utils.js';
import { aside } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  containerize(main, '.hero');
  if (getMetadata('sidenav') === 'false') return;
  main.parentNode.insertBefore(aside(), main);
}

decorate(document);
