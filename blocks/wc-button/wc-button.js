import { loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
  loadScript('/deps/@ui5/webcomponents/dist/Button.js', { type: 'module' });

  block.innerHTML = `<ui5-button>${block.textContent}</ui5-button>`;
}
