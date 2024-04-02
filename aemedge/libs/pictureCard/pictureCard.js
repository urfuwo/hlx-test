import Card from '../card/card.js';
import {
  li, a, span, div, p,
} from '../../scripts/dom-builder.js';
import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import Avatar from '../avatar/avatar.js';

export default class PictureCard extends Card {
  constructor(title, path, type, info, authorEntry, image, tagLabel, description) {
    super(title, path, type, info);
    this.authorEntry = authorEntry;
    this.image = image;
    this.tagLabel = tagLabel;
    this.description = description;
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

  getAvatarElement(authorEntry) {
    if (!authorEntry) {
      return '';
    }
    loadCSS(`${window.hlx.codeBasePath}/blocks/author-profile/author-profile.css`);
    return authorEntry?.image
      && new URL(this.authorEntry.image).pathname !== '/default-meta-image.png'
      ? div(
        { class: 'author-profile' },
        new Avatar(
          this.authorEntry.author,
          this.authorEntry.description,
          this.authorEntry.path,
          this.authorEntry.image,
        ).render('small'),
      )
      : div(
        { class: 'author subtitle' },
        a({ href: this.authorEntry.path }, span(`${this.authorEntry.author}`)),
      );
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
      div(
        { class: 'cardcontent' },
        this.getTagLabel(),
        div({ class: 'type' }, this.getType()),
        div({ class: 'title text' }, a({ href: this.path }, this.title)),
        this.getDescription(horizontal),
      ),
      div(
        { class: 'infoblock' },
        this.getAvatarElement(this.authorEntry),
        div({ class: 'info' }, this.info),
      ),
    );
  }
}
