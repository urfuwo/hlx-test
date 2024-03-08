import { button, p } from '../../scripts/dom-builder.js';
import { loadCSS } from '../../scripts/aem.js';

export default class Button {
  constructor(label) {
    this.label = label;
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/button/button.css`);
    }
    return p(
      { class: 'button-wrapper' },
      button(
        {
          class: 'button',
          type: 'button',
          'aria-label': this.label,
        },
        this.label
      )
    );
  }
}
