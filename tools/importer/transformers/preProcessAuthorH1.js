export default function preProcessAuthorH1 (main, document, html, params, url) {
    document._AUTHOR_H1 = document.querySelector('h1.c-heading');
}