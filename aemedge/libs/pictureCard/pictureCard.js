import Card from '../card/card.js';
import {
  li, a, span, div, p,
} from '../../scripts/dom-builder.js';
import { createOptimizedPicture, toClassName, loadCSS } from '../../scripts/aem.js';
import { renderProfile } from '../../scripts/profile.js';

export default class PictureCard extends Card {
  constructor(title, path, type, info, authorEntry, image, tagLabel, description) {
    super(title, path, type, info);
    this.authorEntry = authorEntry;
    this.image = image;
    this.tagLabel = tagLabel;
    this.description = description;
  }

  getAuthorUrl() {
    return `/author/${toClassName(this.author).replace('-', '')}`;
  }

  getOptimizedPicture() {
    return createOptimizedPicture(this.image, this.title, false, [{ width: '750' }]);
  }

  getTagLabel() {
    return this.tagLabel ? span({ class: 'tag-label' }, this.tagLabel) : '';
  }

  getDescription(horizontal) {
    return horizontal && this.description && this.description !== '0'
      ? p({ class: 'description' }, this.description)
      : '';
  }

  render(horizontal, excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/pictureCard/pictureCard.css`);
    }

    return li(
      { class: `picture-card ${horizontal ? 'horizontal' : ''}` },
      div(
        { class: 'picture' },
        a({ href: this.path, 'aria-label': this.title }, this.getOptimizedPicture()),
      ),
      span(
        { class: 'cardcontent' },
        this.getTagLabel(),
        span({ class: 'type' }, this.getType()),
        span({ class: 'title' }, a({ href: this.path }, this.title)),
        this.getDescription(horizontal),
      ),
      div(
        { class: 'info-block' },
        this.authorEntry?.image && this.authorEntry?.hasAvatar
          ? div({ class: 'author-profile' }, renderProfile(this.authorEntry, true))
          : span(
            { class: 'author' },
            a({ href: this.authorEntry.path }, span(`${this.authorEntry.author}`)),
          ),
        div({ class: 'info' }, this.info),
      ),
    );
  }
}
