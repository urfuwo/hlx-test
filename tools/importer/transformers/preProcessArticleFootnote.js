export default function preProcessArticleFootnote(main, document, html, params, url) {
  const hrLine = document.querySelector('section#main > article div.entry-content hr');
  if (hrLine) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('footnote-wrapper');
    let siblingElement = hrLine.nextElementSibling;
    while (siblingElement) {
      wrapper.append(siblingElement);
      siblingElement = siblingElement.nextElementSibling;
    }

    if (wrapper.children.length > 0) {
      hrLine.replaceWith(wrapper);
    }
  }
}
