import { containerize } from '../../scripts/utils.js';
import { nav } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  containerize(main, '.hero');
  const template = getMetadata('template');
  const showMainNav = getMetadata('mainnav') !== 'false';
  const mainNavContainer = nav();

  if (template === 'designportal' && showMainNav) {
    main.parentNode.insertBefore(mainNavContainer, main);
  }
}

decorate(document);
