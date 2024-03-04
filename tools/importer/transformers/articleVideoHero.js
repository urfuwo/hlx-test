/* global WebImporter */
const transformVideoHero = (main, document) => {
  const heading = document.querySelector('section#main > article.sap-tv h1');
  if (heading) {
    //
    const wrapper = document.createElement('div');
    const eyebrow = document.createElement('p');
    eyebrow.textContent = 'Video';
    wrapper.append(eyebrow, heading);

    const block = [['Hero'], [wrapper]];
    const table = WebImporter.DOMUtils.createTable(block, document);

    main.insertBefore(table, main.firstChild);
  }
};
export default transformVideoHero;
