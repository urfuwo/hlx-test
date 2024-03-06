import {
    li, a, span,
  } from '../../scripts/dom-builder.js';

export default class Card {
    constructor(title, subtitle, path, type){
        this.title = title;
        this.subtitle = subtitle;
        this.path = path;
        this.type = type;
    }

    getType() {
        return this.type?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }

    render() {
        return li(
            { class: 'card' },
            a(
            { href: this.path, 'aria-label': this.title }
            ),
            span(
            { class: 'cardcontent' },
            span(
                { class: 'type' },
                this.getType(),
            ),
            span({ class: 'title' }, a({ href: this.path}, this.title)),
            span({ class: 'subtitle' }, this.subtitle),
            ),
        );
    }
}