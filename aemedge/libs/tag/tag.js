import { loadCSS } from '../../scripts/aem.js';
import { a } from '../../scripts/dom-builder.js';

export default class Tag {
  tag;

  constructor(tag) {
    this.tag = tag;
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/tag/tag.css`);
    }
    let tagHref = this.tag['topic-path'];
    if (document.location.pathname.startsWith('/news/') && this.tag['news-path']) {
      tagHref = this.tag['news-path'];
    }
    return a({ class: 'tag', href: tagHref }, this.tag.label);
  }
}
