/* global WebImporter */
export default function transformVideo(main, document, html) {
  const videos = document.querySelectorAll('div.flex-video, figure.is-provider-youtube, section[data-inpsyde-embed="youtube"]');
  videos.forEach((video) => {
    const link = video.querySelector('a[rel=noreferrer]');
    if ((link && link.href.indexOf('youtube.com') !== -1) || link.href.indexOf('youtu.be') !== -1) {
      const videolink = document.createElement('p');
      videolink.textContent = link.href;
      const placeholder = video.querySelector('div[data-inpsyde-embed-preview="youtube"] > img');
      if (placeholder) {
        const wrapper = document.createElement('div');
        wrapper.append(placeholder, videolink);
        const block = [['Embed'], [wrapper]];
        const table = WebImporter.DOMUtils.createTable(block, document);
        video.replaceWith(table);
      } else {
        video.replaceWith(videolink);
      }
    }
  });
}
