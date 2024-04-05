import { createOptimizedPicture, decorateIcons, loadCSS } from '../../scripts/aem.js';
import {
  div, a, h2, p, span,
} from '../../scripts/dom-builder.js';

const breakpoints = [{ width: '480' }];

export default class Avatar {
  constructor(title, description, path, image) {
    this.title = title;
    this.description = description;
    this.path = path;
    this.image = image;
  }

  getOptimizedPicture() {
    return this.image ? createOptimizedPicture(this.image, this.title, false, breakpoints) : null;
  }

  render(size, excludeStyles, imageOnly) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/avatar/avatar.css`);
    }
    if (imageOnly) {
      return div({ class: `avatar ${size}` }, this.image ? div(this.getOptimizedPicture()) : div());
    }
    return div(
      { class: 'avatar-wrapper' },
      div({ class: `avatar ${size}` }, this.image ? div(this.getOptimizedPicture()) : div()),
      div(
        { class: 'avatar-info' },
        div({ class: 'title' }, a({ href: this.path }, div(`${this.title}`))),
        this.description ? div({ class: 'description info' }, this.description) : '',
      ),
    );
  }

  renderDetails(size, excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/avatar/avatar.css`);
    }
    const element = div(
      { class: 'avatar-wrapper' },
      div({ class: `avatar ${size}` }, this.image ? div(this.getOptimizedPicture()) : div()),
      div(
        { class: 'avatar-details' },
        h2(this.title),
        p(this.description),
        p(
          { class: 'link' },
          a({ href: this.path, 'aria-label': 'Read more' }, 'See more by this author'),
          span({ class: 'icon icon-link-arrow' }),
        ),
      ),
    );
    decorateIcons(element);
    return element;
  }
}
