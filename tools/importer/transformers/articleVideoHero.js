/* global WebImporter */
const transformVideoHero = (main, document) => {
  const heading = document.querySelector('section#main > article.sap-tv h1');
  if (heading) {
    const wrapper = document.createElement('div');

    // get hero image from video thumbnail
    const videoThumbnail = document.querySelector('section#main > article.sap-tv > div.flex-video img');
    if (videoThumbnail) {
      wrapper.append(videoThumbnail.cloneNode(true));
    }

    const eyebrow = document.createElement('h6');
    eyebrow.textContent = 'Video';
    wrapper.append(eyebrow, heading);

    const block = [['Hero'], [wrapper]];
    const table = WebImporter.DOMUtils.createTable(block, document);

    main.insertBefore(table, main.firstChild);
  }
};
export default transformVideoHero;
