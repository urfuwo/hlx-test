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
 * Decorates image links in a specified container by replacing
 * the picture elements with anchor elements.
 * @param {Element} main - The container element
 */
function decorateImageLinks(main) {
  main.querySelectorAll('p picture').forEach((picture) => {
    const linkElement = picture.nextElementSibling;
    if (linkElement && linkElement.tagName === 'A' && linkElement.href.startsWith('https://www.linkedin.com/posts/')) {
      const linkURL = linkElement.href;

      /**
       * The new anchor element to replace the picture element.
       * @type {HTMLAnchorElement}
       */
      const newLink = Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener',
        href: linkURL,
      });
      while (picture.firstChild) {
        newLink.appendChild(picture.firstChild);
      }
      picture.parentNode.replaceChild(newLink, picture);
      linkElement.remove();
    }
  });
}

/**
 * Decorates fragment links
 * @param {Element} main The container element
 */
function decorateFragmentLinks(main) {
  const links = main.querySelectorAll('a');
  [...links].forEach((link) => {
    const path = link.getAttribute('href');
    if (path && path.startsWith('/') && path.includes('/fragments/')) {
      const fragmentLinkPlaceHolder = document.createElement('span');
      fragmentLinkPlaceHolder.className = 'fragment-link';
      fragmentLinkPlaceHolder.innerHTML = path;
      link.replaceWith(fragmentLinkPlaceHolder);
    }
  });
}

/**
 * Placeholder for decorateFragments method, since it's already used in decorateMain
 */
let decorateFragments;

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export async function decorateMain(main, shouldDecorateTemplates = true) {
  // hopefully forward compatible button decoration
  decorateFragmentLinks(main);
  decorateButtons(main);
  decorateIcons(main);
  decorateImageLinks(main);
  if (shouldDecorateTemplates) {
    await decorateTemplates(main);
  }
  decorateSections(main);
  decorateBlocks(main);
  decorateMultiColumnSections(main);
  decorateFragments(main);
}

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();

      // reset base path for media to fragment base
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
        });
      };
      resetAttributeBase('img', 'src');
      resetAttributeBase('source', 'srcset');

      await decorateMain(main, false);
      await loadBlocks(main);
      return main;
    }
  }
  return null;
}

async function replaceLinkPlaceHolderWithFragment(link) {
  const path = link.innerHTML;
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      link.closest('.section').classList.add(...fragmentSection.classList);
      let nodeToReplace = link;
      while (nodeToReplace.parentNode.tagName !== 'DIV' && nodeToReplace.childNodes.length === 1) {
        nodeToReplace = nodeToReplace.parentNode;
      }
      nodeToReplace.replaceWith(...fragment.childNodes);
    }
  }
}

/**
 * Decorates fragments
 * @param {Element} main The container element
 */
decorateFragments = function decorateFragmentsFunction(main) {
  const links = main.querySelectorAll('span.fragment-link');
  [...links].forEach(async (link) => {
    replaceLinkPlaceHolderWithFragment(link);
  });
};

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
