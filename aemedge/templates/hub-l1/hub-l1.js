import { containerize } from '../../scripts/utils.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  containerize(main, '.hero');
}

decorate(document);
