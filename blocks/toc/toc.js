function createEntry(element) {
  const listEl = document.createElement('li');
  const spanEl = document.createElement('span');
  listEl.append(spanEl);
  const linkEl = document.createElement('a');
  linkEl.href = `#${element.id}`;
  linkEl.innerText = element.innerText;
  linkEl.classList.add(`toc-${element.tagName.toLowerCase()}`);
  listEl.append(linkEl);
  return listEl;
}

export default async function decorate(block) {
  const mainContent = document.querySelector('main > :nth-child(3)');
  const headers = mainContent.querySelectorAll('h2, h3');
  const tocElement = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.innerText = 'What\'s on this page';
  tocElement.appendChild(h2);
  const tocList = document.createElement('ol');
  headers.forEach((header) => {
    const entry = createEntry(header);
    tocList.appendChild(entry);
  });
  tocElement.appendChild(tocList);
  tocElement.classList.add('toc');
  block.append(tocElement);
}

function setActiveLink() {
  const links = document.querySelectorAll('.toc li');
  links.forEach((link) => {
    const linkHash = link.querySelector('a').hash;
    if (linkHash === window.location.hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('load', setActiveLink);
window.addEventListener('hashchange', setActiveLink);
