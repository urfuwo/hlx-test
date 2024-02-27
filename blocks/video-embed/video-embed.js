/* eslint-disable max-len */
/**
 * Represents an Video Embed Block that allows for a video to be embedded in-line on a page
 * @namespace VideoEmbedBlock
 * @see {@link https://www.hlx.live/developer/block-collection/embed}
 */

/**
 * Embeds a YouTube video.
 * @memberof VideoEmbedBlock
 * @function embedYoutube
 * @param {URL} url - The URL of the YouTube video.
 * @returns {string} - The HTML code for embedding the YouTube video.
 */
const embedYoutube = (url) => {
  const embedHTML = `<div class="video-embed-container">
    <iframe src="${url.href}&autoplay=1"
    class="video-embed-iframe"
    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture"
    allowfullscreen=""
    scrolling="no"
    title="Content from Youtube"
    loading="lazy"></iframe>
    </div>`;
  return embedHTML;
};

/**
 * Embeds a SAP DAM video.
 * @memberof VideoEmbedBlock
 * @function embedSapDam
 * @param {URL} url - The URL of the SAP DAM video.
 * @param {boolean} autoplay - Whether to autoplay the video.
 * @returns {string} - The HTML code for embedding the SAP DAM video.
 * @todo
 */
const embedSapDam = (url) => {
  const embedHTML = `<div class="video-embed-container">
    <iframe src="${url.href}"
    class="video-embed-iframe"
    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture"
    allowfullscreen=""
    scrolling="no"
    title="Content from Youtube"
    loading="lazy"></iframe>
    </div>`;
  return embedHTML;
};

/**
 * Loads the appropriate embed based on the source and id.
 * @memberof VideoEmbedBlock
 * @function loadEmbed
 * @param {HTMLElement} block - The HTML block element.
 * @param {string} source - The source of the video.
 * @param {string} id - The ID of the video.
 */
const loadEmbed = (block, source, id) => {
  if (block.classList.contains('embed-is-loaded')) {
    return;
  }

  const EMBEDS_CONFIG = [
    {
      match: ['youtube'],
      embed: embedYoutube,
      link: `https://www.youtube.com/embed/${id}?rel=0&v=${id}`,
    },
    {
      match: ['dam'],
      embed: embedSapDam,
      link: `https://d.dam.sap.com/m/${id}/hls.m2u8`,
    },
  ];

  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => source.toLowerCase().includes(match)));
  const url = new URL(config.link);

  if (config) {
    block.innerHTML = config.embed(url);
    block.classList = `block video-embed video-embed-${config.match[0]}`;
  }

  block.classList.add('embed-is-loaded');
};

/**
 * Extracts video data from HTML fragments.
 * @memberof VideoEmbedBlock
 * @function extractVideoData
 * @param {HTMLElement} block - The HTML fragment to parse.
 * @returns {Object[]} - Array of objects with extracted data.
 */
const extractVideoData = (block) => {
  const containers = block.querySelectorAll('.video-embed > div');
  const videoData = [];

  containers.forEach((container) => {
    const firstChild = container.querySelector('div:first-child');
    const secondChild = container.querySelector('div:last-child');
    if (firstChild && secondChild) {
      const data = {};
      const key = firstChild.textContent.trim().replace(/\s+/g, '_').toLowerCase();
      data[key] = secondChild.textContent.trim();
      videoData.push(data);
      container.parentElement.removeChild(container); // Remove the second child div
    }
  });

  return videoData;
};

/**
 * Decorates the block.
 * @memberof VideoEmbedBlock
 * @function decorate
 * @param {HTMLElement} block - The HTML block fragment.
 */
export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const videoData = extractVideoData(block);
  const { video_id: id } = videoData.find((data) => data.video_id);
  const { source } = videoData.find((data) => data.source);

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-embed-placeholder';
    wrapper.prepend(placeholder);
    block.append(wrapper);
    placeholder.addEventListener('click', () => loadEmbed(block, source, id));
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadEmbed(block, source, id);
      }
    });
    observer.observe(block);
  }
}
