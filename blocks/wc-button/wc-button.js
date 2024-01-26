import 'udex-button';

export default async function decorate(block) {
  block.innerHTML = `<ui5-button>${block.textContent}</ui5-button>`;
}
