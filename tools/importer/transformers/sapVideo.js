/* global WebImporter */

// sample https://www.sap.com/insights/viewpoints/turning-agricultural-waste-into-buildings.html

// eslint-disable-next-line no-unused-vars
export default function transformVideo(main, document, html) {
  document.querySelectorAll('div.interactiveVisual').forEach((video) => {
    if (video.querySelector('button[class^="PlayIcon__root--"]')) {
      const videoJsonPath = video.firstElementChild.getAttribute('data-model');
      if (videoJsonPath) {
        const videoJsonUrl = new URL(videoJsonPath, 'http://localhost:3001'); // load video metadata via proxy
        videoJsonUrl.searchParams.append('host', 'https://www.sap.com');

        let videoJson = {};
        const videoJsonRequest = new XMLHttpRequest();
        videoJsonRequest.open('GET', videoJsonUrl, false);
        videoJsonRequest.send();

        if (videoJsonRequest.status === 200) {
          videoJson = JSON.parse(videoJsonRequest.responseText);

          const videoTitle = videoJson.videoAlt;
          const videoThumbnail = videoJson.sourceConfig[0].srcUrl;
          const videoSource = videoJson.videoModel.akamaiUrl;

          const wrapper = document.createElement('div');
          if (videoThumbnail) {
            const thumbnail = document.createElement('img');
            thumbnail.src = videoThumbnail;
            wrapper.append(thumbnail);
          }

          const linkWrapper = document.createElement('p');
          const href = document.createElement('a');
          href.href = videoSource;
          href.textContent = videoTitle;
          linkWrapper.append(href);
          wrapper.append(linkWrapper);

          const block = [['Embed'], [wrapper]];
          const table = WebImporter.DOMUtils.createTable(block, document);
          video.replaceWith(table);
        }
      }
    }
  });
}
