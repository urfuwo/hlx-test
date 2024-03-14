import {
  buildBlock,
  decorateBlock,
  decorateBlocks,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateTemplateAndTheme,
  getMetadata,
  loadBlock,
  loadBlocks,
  loadCSS,
  loadFooter,
  loadSideNav,
  loadHeader,
  sampleRUM,
  toClassName,
  waitForLCP,
} from './aem.js';

const LCP_BLOCKS = ['hero']; // add your LCP blocks to the list
const TEMPLATE_LIST = {
  article: 'article',
  'hub-l2': 'hub',
  'hub-l1': 'hub',
};

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

async function decorateTemplates(main) {
  try {
    const template = toClassName(getMetadata('template'));
    const templates = Object.keys(TEMPLATE_LIST);
    if (templates.includes(template)) {
      const templateName = TEMPLATE_LIST[template];
      loadCSS(`${window.hlx.codeBasePath}/templates/${templateName}/${templateName}.css`);
      const mod = await import(`${window.hlx.codeBasePath}/templates/${templateName}/${templateName}.js`);
      if (mod.default) {
        await mod.default(main);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Template decoration failed', error);
  }
}

/**
 * Embeds supported video players for link elements for supported video hostnames.
 * @async
 * @param {HTMLElement} main - The HTML fragment containing the video links.
 * @returns {Promise<void>} - A Promise that resolves when the video links are decorated.
 */
async function decorateVideoLinks(main) {
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
  ];

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

/**
 * Decorates all multi-column sections in a container element.
 * @param {Element} main The container element
 */
function decorateMultiColumnSections(main) {
  main.querySelectorAll(':scope > div.column-section-1-1, :scope > div.column-section-3-2, :scope > div.column-section-2-3, :scope > div.column-section-2-1, :scope > div.column-section-1-2, :scope > div.column-section-3-1, :scope > div.column-section-1-3').forEach((section) => {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'column-section-left-block column-section-block';
    right.className = 'column-section-right-block column-section-block';

    Array.from(section.children).forEach((e) => {
      (e.classList.contains('right-style-wrapper') ? right : left).append(e.cloneNode(true));
    });

    section.append(left, right);
    section.classList.add('column-section');
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export async function decorateMain(main, shouldDecorateTemplates = true) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  if (shouldDecorateTemplates) {
    await decorateTemplates(main);
  }
  decorateSections(main);
  decorateBlocks(main);
  decorateVideoLinks(main);
  decorateMultiColumnSections(main);
}

function setSAPTheme() {
  const sapTheme = getMetadata('saptheme', document) || 'sap_glow';
  if (sapTheme) {
    const head = document.querySelector('head');
    const ui5ThemeScript = document.createElement('script');
    ui5ThemeScript.setAttribute('data-ui5-config', '');
    ui5ThemeScript.setAttribute('type', 'application/json');
    ui5ThemeScript.textContent = `{"theme": "${sapTheme}"}`;
    head.append(ui5ThemeScript);
  }
}

function initSidekick() {
  const preflightListener = async () => {
    const section = document.createElement('div');
    const wrapper = document.createElement('div');
    section.appendChild(wrapper);
    const preflightBlock = buildBlock('preflight', '');
    wrapper.appendChild(preflightBlock);
    decorateBlock(preflightBlock);
    await loadBlock(preflightBlock);
    const { default: getModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);
    const customModal = await getModal('dialog-modal', () => section.innerHTML, (modal) => {
      modal.querySelector('button[name="close"]')?.addEventListener('click', () => modal.close());
    });
    customModal.showModal();
  };

  const sk = document.querySelector('helix-sidekick');
  if (sk) {
    sk.addEventListener('custom:preflight', preflightListener); // TODO change to preflight
  } else {
    document.addEventListener('sidekick-ready', () => {
      const oAddedSidekick = document.querySelector('helix-sidekick');
      oAddedSidekick.addEventListener('custom:preflight', preflightListener);
    }, { once: true });
  }
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  setSAPTheme();
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    await decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  initSidekick();
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadSideNav(doc.querySelector('aside'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
