import { loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
  loadScript('/deps/@ui5/webcomponents/dist/Breadcrumbs.js', { type: 'module' });

  const items = block.querySelectorAll('ul > li');

  const breadcrumb = document.createElement('ui5-breadcrumbs');
  items.forEach((item) => {
    const breadcrumbItem = document.createElement('ui5-breadcrumbs-item');
    breadcrumbItem.textContent = item.textContent;
    breadcrumb.appendChild(breadcrumbItem);
  });

  block.replaceWith(breadcrumb);
}
