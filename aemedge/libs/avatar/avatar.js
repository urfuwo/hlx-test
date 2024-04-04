import { createOptimizedPicture, decorateIcons, loadCSS } from '../../scripts/aem.js';
import {
  div, a, h2, p, span,
} from '../../scripts/dom-builder.js';

const breakpoints = [{ width: '480' }];

export default class Avatar {
  constructor(name, title, description, path, image) {
    this.name = name;
    this.title = title;
    this.description = description;
    this.path = path;
    this.image = image;
  }

  getImage() {
    return this.image ? createOptimizedPicture(this.image, this.title, false, breakpoints) : null;
  }

  render(size, excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/avatar/avatar.css`);
    }
    const element = div(
      { class: 'avatar-wrapper' },
      div({ class: `avatar ${size}` }, this.image ? div(this.getImage()) : div()),
      div(
        { class: 'avatar-info' },
        div({ class: 'name' }, a({ href: this.path }, div(`${this.name}`))),
        this.description ? div({ class: 'description info' }, this.description) : '',
      ),
    );
    return element;
  }

  renderDetails(size, excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/avatar/avatar.css`);
    }
    const element = div(
      { class: 'avatar-wrapper' },
      div({ class: `avatar ${size}` }, this.image ? div(this.getImage()) : div()),
      div(
        { class: 'avatar-details' },
        h2(this.name),
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
