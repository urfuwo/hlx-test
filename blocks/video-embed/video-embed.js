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
const embedYoutube = (url, autoplay = true) => {
  const usp = new URLSearchParams(url.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }

  const embedHTML = `<div class="video-embed-container">
    <iframe src="https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}"
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
  const [, , vid] = url.pathname.split('/');
  const embedHTML = `<sap-video-player><source>https://d.dam.sap.com/m/${vid}/hls.m2u8</source></sap-video-player>`;
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
const loadEmbed = (block, link) => {
  if (block.classList.contains('embed-is-loaded')) {
    return;
  }

  const EMBEDS_CONFIG = [
    {
      match: ['youtube', 'youtu.be'],
      embed: embedYoutube,
    },
    {
      match: ['d.dam.sap.com'],
      embed: embedSapDam,
    },
  ];

  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => link.toLowerCase().includes(match)));
  const url = new URL(link);

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
  const linkDiv = block.querySelector('.video-embed > div:last-child');
  const link = linkDiv.textContent.trim();
  linkDiv.parentElement.removeChild(linkDiv); // Remove the second child div
  return link;
};

/**
 * Decorates the block.
 * @memberof VideoEmbedBlock
 * @function decorate
 * @param {HTMLElement} block - The HTML block fragment.
 */
export default function decorate(block) {
  console.log(block);

  const placeholder = block.querySelector('picture');
  const link = extractVideoData(block);

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-embed-placeholder';
    wrapper.prepend(placeholder);
    block.append(wrapper);
    placeholder.addEventListener('click', () => loadEmbed(block, link));
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadEmbed(block, link);
      }
    });
    observer.observe(block);
  }
}
