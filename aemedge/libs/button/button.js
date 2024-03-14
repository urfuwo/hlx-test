import { button, p, span } from '../../scripts/dom-builder.js';
import { loadCSS, decorateIcons } from '../../scripts/aem.js';

export default class Button {
  constructor(label, icon) {
    this.label = label;
    this.icon = icon;
  }

  getIcon() {
    return this.icon ? span({ class: `icon ${this.icon}` }) : '';
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/button/button.css`);
    }
    const btn = p(
      { class: 'button-wrapper' },
      button(
        {
          class: 'button',
          type: 'button',
          'aria-label': this.label,
        },
        this.label,
        this.getIcon(),
      ),
    );
    if (this.icon) {
      decorateIcons(btn);
    }
    return btn;
  }
}
