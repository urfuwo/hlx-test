// import { loadCSS } from '../../scripts/aem.js';

export default async function decorate(block) {
  // loadCSS(`${window.hlx.codeBasePath}/libs/button/button.css`);

  const blockChildren = block.querySelectorAll('div + div p');
  const arrElemsWithButtons = Array.from(blockChildren).filter((childElem) => Boolean(childElem.querySelector('a')));
  arrElemsWithButtons.forEach((elem) => {
    const hasButton = elem.querySelector('a');
    if (hasButton) {
      elem.classList.remove('button-wrapper');
      elem.classList.add('button-container');
      const btnClasses = ['button', 'medium', 'no-margin'];
      elem.firstChild?.firstChild?.classList?.add(...btnClasses);
      if (elem.firstChild.tagName === 'EM') {
        elem.firstChild?.firstChild?.classList?.add('secondary');
      } else {
        elem.firstChild?.firstChild?.classList?.add('primary');
      }
    }
  });
}
