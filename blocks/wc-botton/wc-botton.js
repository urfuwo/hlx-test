import { loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
  loadScript('/deps/@ui5/webcomponents/dist/Button.js', { type: 'module' });
  block.innerHTML = '<ui5-button>Hello UI5 Web Components</ui5-button>';
}
