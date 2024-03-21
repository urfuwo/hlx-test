import { decorateButtons, decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  decorateButtons(block);

  const parentElems = document.querySelectorAll('.default-content-wrapper .button-container');
  Array.from(parentElems).forEach((elem) => {
    elem.classList.remove('button-container');
    elem.classList.add('link-container');
    const iconSpan = document.createElement('span');
    iconSpan.classList.add(...['icon', 'icon-link-arrow']);
    elem.appendChild(iconSpan);
    elem.firstChild.classList.remove('button');
    elem.firstChild.classList.add('link');
    decorateIcons(elem);
  });
}
