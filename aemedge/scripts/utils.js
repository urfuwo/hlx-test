import { div } from './dom-builder.js';

function formatDate(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
}

function containerize(container, targetClass) {
  const target = container.querySelector(targetClass);
  if (target && target.nextElementSibling && !target.nextElementSibling.classList.contains('section-metadata')) {
    const sectionMetadata = target.parentElement.querySelector(':scope > .section-metadata');
    const wrapperDiv = div({}, target, sectionMetadata || '');
    container.insertBefore(wrapperDiv, container.firstChild);
  }
}

export { formatDate, containerize };
