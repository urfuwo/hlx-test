import Card from "../card/card.js";
import {
    li, a, span,
  } from '../../scripts/dom-builder.js';
  import { createOptimizedPicture, toClassName, loadCSS } from '../../scripts/aem.js';

export default class PictureCard extends Card {
    constructor(title, subtitle, path, type, author, image, label, date){
        super(title, subtitle, path, type);
        this.author = author;
        this.image = image;
        this.label = label;
        this.date = date;
        loadCSS(`${window.hlx.codeBasePath}/libs/pictureCard/pictureCard.css`)
    }

    getAuthorUrl(){
        return `/author/${toClassName(this.author).replace('-', '')}`;
    }

    getOptimizedPicture(){
        return createOptimizedPicture(this.image, this.title, false, [{ width: '750' }]);
    }

    getLabel(){
        return this.label ? span({ class: 'hot' }, 'Hot Story') : ''
    }

    getFormattedDate(){
        const ARTICLE_FORMATTER = new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        return ARTICLE_FORMATTER.format(new Date(this.date * 1000));
    }

    render() {
        return li(
            { class: 'card' },
            a(
              { href: this.path, 'aria-label': this.title },
              this.getOptimizedPicture(),
            ),
            span(
              { class: 'cardcontent' },
              span(
                { class: 'template' },
                this.getType(),
              ),
              this.getLabel(),
              span({ class: 'title' }, a({ href: this.path }, this.title)),
              span({ class: 'author' }, a({ href: this.getAuthorUrl() }, span(`${this.author}`))),
              span({ class: 'date' }, this.getFormattedDate()),
            ),
          );
    }
}