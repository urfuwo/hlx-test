/**
 * Embeds a YouTube video.
 * @function embedYoutube
 * @param {URL} url - The URL of the YouTube video.
 * @param {boolean} [autoplay=false] - Whether to autoplay the video, defaults to false.
 * @returns {string} - The HTML code for embedding the YouTube video.
 */
const embedYoutube = (url, autoplay = false) => {
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
 * Embeds a LinkedIn Video.
 * @function embedLinkedIn
 * @param {URL} url - The URL of the LinkedIn video.
 * @returns {string} - The HTML for embedding the LinkedIn video.
 */
const embedLinkedIn = (url) => {
  const [, , , , vid] = url.pathname.split('/');
  const embedHTML = `<div class="video-embed-container">
    <iframe src="https://www.linkedin.com/embed/feed/update/${vid}?compact=1"
    class="video-embed-iframe"
    frameborder="0" allowfullscreen=""
    title="Embedded LinkedIn Video"></iframe>
    </div>`;
  return embedHTML;
};

/**
 * Embeds a VideoJS Video.
 * @function embedLinkedIn
 * @param {URL} url - The URL of the VideoJS video.
 * @returns {string} - The HTML for embedding the VideoJS video.
 */
const embedVideoJS = (url) => {
  // eslint-disable-next-line comma-dangle
  const [, , vid,] = url.pathname.split('/');
  const embedHTML = `
    <link rel="stylesheet" href="/styles/video-js.css">
    <script src="/scripts/video-js.lib.js"></script>
    <div class="video-embed-container video-embed-no-padding">
      <video
        id="video-js"
        class="video-js video-embed-iframe"
        controls
        preload="auto"
        poster="https://www.sap.com/dam/site/sapcom/multimedia/2022/10/56ccd577-4d7e-0010-bca6-c68f7e60039b.mp4/_jcr_content/renditions/cq5dam.thumbnail.640.360.jpg"
        data-setup='{}'>
        <source src="https://d.dam.sap.com/m/${vid}/hls.m3u8" type="video/mp4"></source>
      </video>
    </div>
  `;
  return embedHTML;
};

/**
 * Configuration for different types of embeds.
 * @typedef {Object} EmbedConfig
 * @property {string[]} match - The list of keywords to match against URLs.
 * @property {Function} embed - The function to call for embedding the content.
 */
const EMBEDS_CONFIG = [
  {
    match: ['youtube', 'youtu.be'],
    embed: embedYoutube,
  },
  {
    match: ['linkedin.com'],
    embed: embedLinkedIn,
  },
  {
    match: ['d.dam.sap.com'],
    embed: embedVideoJS,
  },
];

/**
 * Embeds supported video players for link elements for supported video hostnames.
 * @async
 * @param {HTMLElement} main - The HTML fragment containing the video links.
 * @returns {Promise<void>} - A Promise that resolves when the video links are decorated.
 */
async function decorateVideoLinks(main) {
  const videoLinks = main.querySelectorAll('p a');

  videoLinks.forEach((a) => {
    const p = a.parentNode;
    const link = new URL(a.href);
    // eslint-disable-next-line max-len
    const matchedConfig = EMBEDS_CONFIG.find((config) => config.match.some((keyword) => link.href.includes(keyword)));

    if (matchedConfig) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          p.innerHTML = matchedConfig.embed(link);
          p.classList.add('video');
        }
      });
      observer.observe(p);
    }
  });
}

// eslint-disable-next-line no-restricted-exports
export { decorateVideoLinks as default };
