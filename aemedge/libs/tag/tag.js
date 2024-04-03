import { loadCSS, toCamelCase, toClassName } from '../../scripts/aem.js';
import { a } from '../../scripts/dom-builder.js';

export default class Tag {
  tagText;

  constructor(tag, placeholders = []) {
    this.tagText = (placeholders[toCamelCase(`tag/${tag}`)] || tag).trim();
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/tag/tag.css`);
    }
    return a({ class: 'tag', href: `/tags/${toClassName(this.tagText)}` }, this.tagText);
  }
}
