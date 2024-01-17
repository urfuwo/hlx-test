export default function preProcessArticleSection (main, document, html, params, url) {
    const schema = JSON.parse(document.querySelector('script[class="yoast-schema-graph"]').textContent);
    document._ARTICLE_SECTIONS_ = schema["@graph"][0].articleSection;
}