/* eslint-disable max-len */
/**
 * Represents an Embed Block that allows for a video to be embedded in-line on a page.
 * @namespace EmbedBlock
 * @see {@link https://www.hlx.live/developer/block-collection/embed}
 */

/**
 * Embeds a YouTube video.
 * @function embedYoutube
 * @memberof EmbedBlock
 * @param {URL} url - The URL of the YouTube video.
 * @param {boolean} [autoplay=true] - Whether to autoplay the video. Defaults to true.
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

  vid = decodeURI(`${vid}`).replace(/\\/g, '');

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

const setConsent = (value, key = 'videoConsent') => {
  if (sessionStorage.getItem(key)) {
    const currentConsentSet = new Set(sessionStorage.getItem(key).split(','));
    if (!currentConsentSet.has(value)) {
      sessionStorage.setItem(key, `${Array.from(currentConsentSet).join(',')},${value}`);
    }
  } else {
    sessionStorage.setItem(key, value);
  }
};

const getConsent = (source, key = 'videoConsent') => {
  let output = false;
  if (sessionStorage.getItem(key)) {
    const consentSet = new Set(sessionStorage.getItem(key).split(','));
    if (consentSet.has(source)) {
      output = true;
    }
  }
  return output;
};

/**
 * Embeds a LinkedIn Video.
 * @function embedLinkedIn
 * @memberof EmbedBlock
 * @param {URL} url - The URL of the LinkedIn video.
 * @returns {string} - The HTML for embedding the LinkedIn video.
 */
const embedLinkedIn = (url) => {
  const [, , , , vid] = url.pathname.split('/');
  const embedHTML = `<div class="embed-container">
    <iframe src="https://www.linkedin.com/embed/feed/update/${vid}?compact=1"
    class="embed-iframe"
    frameborder="0" allowfullscreen=""
    title="Embedded LinkedIn Video"></iframe>
    </div>`;
  return embedHTML;
};

/**
 * Embeds a VideoJS Video.
 * @function embedVideoJS
 * @memberof EmbedBlock
 * @param {URL} url - The URL of the VideoJS video.
 * @returns {string} - The HTML for embedding the VideoJS video.
 */
const embedVideoJS = (url, poster = null) => {
  // eslint-disable-next-line comma-dangle
  const [, , vid,] = url.pathname.split('/');
  const embedHTML = `
    <link rel="stylesheet" href="/styles/video-js.css">
    <script src="/scripts/video-js.lib.js"></script>
    <div class="embed-container embed-no-padding">
      <video
        id="video-js"
        class="video-js embed-iframe"
        controls
        preload="auto"
        poster="${poster}"
        data-setup='{}'>
        <source src="https://d.dam.sap.com/m/${vid}/hls.m3u8" type="video/mp4"></source>
      </video>
    </div>
  `;
  return embedHTML;
};

/**
 * Configuration array for embedding videos.
 * @const {Array<Object>} EMBEDS_CONFIG
 * @memberof EmbedBlock
 * @property {Array<string>} match - An array of strings representing patterns to match against video URLs.
 * @property {Function} embed - The function used to embed the video.
 * @property {string} source - The source of the embedded video.
 */
const EMBEDS_CONFIG = [
  {
    match: ['youtube', 'youtu.be'],
    embed: embedYoutube,
    source: 'YouTube',
  },
  {
    match: ['linkedin.com'],
    embed: embedLinkedIn,
    source: 'LinkedIn',
  },
  {
    match: ['d.dam.sap.com'],
    embed: embedVideoJS,
    source: 'SAP',
  },
];

/**
 * Creates a consent overlay for the block.
 * @memberof EmbedBlock
 * @function createConsentOverlay
 * @param {string} selector - The CSS selector of the block.
 * @param {string} source - The source of the embedded video.
 */
const createConsentOverlay = (selector, source) => {
  const placeholder = document.querySelector(selector);
  const thisOverlaySelector = `.embed-source-${source} .embed-overlay-container`;
  const thisPermaconsentSelector = `.embed-source-${source} .embed-overlay-container .embed-overlay-permaconsent`;

  const consentHtml = `
    <div class="embed-overlay-container hide">
      <p>Click to load the content from ${source}.</p>
      <div class="play-button-outer">
        <div class="play-button"></div>
      </div>
      <p class="embed-overlay-permaconsent" data-service="${source}">Always allow videos from ${source}.</p>
    </div>
  `;
  placeholder.innerHTML = consentHtml + placeholder.innerHTML;

  placeholder.addEventListener('mouseover', () => {
    const overlay = document.querySelector(thisOverlaySelector);
    overlay.classList.remove('hide');
    overlay.classList.add('show');
  });

  placeholder.addEventListener('mouseout', () => {
    const overlay = document.querySelector(thisOverlaySelector);
    overlay.classList.remove('show');
    overlay.classList.add('hide');
  });

  placeholder.querySelector(thisPermaconsentSelector)
    .addEventListener('click', ({ target: { dataset: { service } } }) => {
      console.log("service:", service);
      setConsent(service);
    });
};

/**
 * Loads the appropriate embed based on the source link.
 * @memberof EmbedBlock
 * @function loadEmbed
 * @param {HTMLElement} block - The HTML block element.
 * @param {string} link - The source link of the video.
*/
const loadEmbed = (block, link, poster = null) => {
  if (block.classList.contains('embed-is-loaded')) {
    return;
  }

  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => link.toLowerCase().includes(match)));
  const url = new URL(link);

  if (config) {
    block.innerHTML = config.embed(url, poster);
    block.classList = `block embed embed-${(config.match[0]).replace(/\./g, '-')}`;
  }

  block.classList.add('embed-is-loaded');
};

/**
 * Extracts video data from HTML fragments.
 * @memberof EmbedBlock
 * @function extractVideoData
 * @param {HTMLElement} block - The HTML fragment to parse.
 * @returns {string} - The source link of the video.
 */
const extractVideoData = (block) => {
  console.log(block);
  const linkDiv = block.querySelector('.embed > div:last-child');
  const link = linkDiv.textContent.trim();
  const imageSrc = block.querySelector('.embed picture img').src;
  linkDiv.parentElement.removeChild(linkDiv); // Remove photo
  return {
    href: link,
    poster: imageSrc,
  };
};

/**
 * Decorates the block with embed functionality.
 * @memberof EmbedBlock
 * @function decorate
 * @param {HTMLElement} block - The HTML block element to decorate.
 */
export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const videoData = extractVideoData(block);
  const { href: link, poster } = videoData;
  const source = EMBEDS_CONFIG.reduce((result, config) => {
    if (config.match.some((match) => link.toLowerCase().includes(match))) {
      return config.source;
    }
    return result;
  }, null);

  const hasConsented = getConsent(source);
  console.log(hasConsented);

  if (placeholder && !hasConsented) {
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-placeholder';
    wrapper.prepend(placeholder);
    block.append(wrapper);
    const selectorSource = `embed-source-${source}`;
    wrapper.classList.add(selectorSource);
    createConsentOverlay(`.${selectorSource}`, source);

    document.querySelector(`.${selectorSource}`).addEventListener('click', (event) => {
      console.log(event.target);
      loadEmbed(block, link, poster);
    });
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
