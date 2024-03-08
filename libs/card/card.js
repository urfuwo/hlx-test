import { li, a, span, p } from '../../scripts/dom-builder.js';
import { loadCSS } from '../../scripts/aem.js';
export default class Card {
  constructor(title, path, type, label) {
    this.title = title;
    this.label = label;
    this.path = path;
    this.type = type;
  }

  getType() {
    return this.type
      ?.replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  getLabel() {
    return this.label ? p({ class: 'label' }, this.label) : '';
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/card/card.css`);
    }
    return li(
      { class: 'card' },
      p({ class: 'type' }, this.getType()),
      p(
        { class: 'title' },
        a({ href: this.path, 'aria-label': this.title }, this.title)
      ),
      this.getLabel()
    );
  }
}
