import {
  div, span,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  let clsName;
  block.classList.forEach((cls) => {
    if (cls && cls.startsWith('sg')) {
      clsName = `${cls}-elem`;
    }
  });
  const arr = document.createElement('div');
  block.querySelectorAll(':scope > div > div').forEach(() => {
    const newElem = div({ class: `${clsName} grid-elem` }, span(`Grid Element ${clsName}`));
    arr.appendChild(newElem);
  });
  block.innerHTML = '';
  block.append(...arr.childNodes);
  block.lastChild.classList.add('grid-row-last-elem');
  block.appendChild(div({ class: 'grid-row-end' }));
}
