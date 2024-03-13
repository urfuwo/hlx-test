import Card from "../card/card.js";
import {
    li, a, span, div,
  } from '../../scripts/dom-builder.js';
  import { createOptimizedPicture, toClassName, loadCSS } from '../../scripts/aem.js';

export default class PictureCard extends Card {
    constructor(title, path, type, info, author, image, tagLabel){
        super(title, path, type, info);
        this.author = author;
        this.image = image;
        this.tagLabel = tagLabel;
    }

    getAuthorUrl(){
        return `/author/${toClassName(this.author).replace('-', '')}`;
    }

    getOptimizedPicture(){
        return createOptimizedPicture(this.image, this.title, false, [{ width: '750' }]);
    }

    getTagLabel() {
      return this.tagLabel ? span({ class: 'tag-label' }, this.tagLabel) : '';
    }

    render(horizontal, excludeStyles) {
      if(!excludeStyles){
        loadCSS(`${window.hlx.codeBasePath}/libs/pictureCard/pictureCard.css`)
      }
      
        return li(
            { class: `picture-card ${horizontal? 'horizontal': ''}` },
            div({class: 'picture'}, a(
              { href: this.path, 'aria-label': this.title },
              this.getOptimizedPicture(),
            )),
            span(
              { class: 'cardcontent' },
              this.getTagLabel(),
              span({ class: 'type' },this.getType()),
              span({ class: 'title' }, a({ href: this.path }, this.title)),
              span({ class: 'author' }, a({ href: this.getAuthorUrl() }, span(`${this.author}`))),
              span({ class: 'info' },this.info),
            ),
          );
    }
}