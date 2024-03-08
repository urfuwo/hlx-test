import Card from "../card/card.js";
import {
    li, a, span,
  } from '../../scripts/dom-builder.js';
  import { createOptimizedPicture, toClassName, loadCSS } from '../../scripts/aem.js';

export default class PictureCard extends Card {
    constructor(title, path, type, label, author, image, date){
        super(title, path, type, label);
        this.author = author;
        this.image = image;
        this.label = label;
        this.date = date;
    }

    getAuthorUrl(){
        return `/author/${toClassName(this.author).replace('-', '')}`;
    }

    getOptimizedPicture(){
        return createOptimizedPicture(this.image, this.title, false, [{ width: '750' }]);
    }

    getFormattedDate(){
        const ARTICLE_FORMATTER = new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        const publishedDate =  ARTICLE_FORMATTER.format(new Date(this.date * 1000));
        return span({ class: 'date' }, publishedDate);
    }

    render(excludeStyles) {
      if(!excludeStyles){
        loadCSS(`${window.hlx.codeBasePath}/libs/pictureCard/pictureCard.css`)
      }
      
        return li(
            { class: 'picture-card' },
            a(
              { href: this.path, 'aria-label': this.title },
              this.getOptimizedPicture(),
            ),
            span(
              { class: 'cardcontent' },
              span({ class: 'type' },this.getType()),
              this.getLabel(),
              span({ class: 'title' }, a({ href: this.path }, this.title)),
              span({ class: 'author' }, a({ href: this.getAuthorUrl() }, span(`${this.author}`))),
              this.getFormattedDate(),
            ),
          );
    }
}