import { getMetadata, loadCSS } from '../../scripts/aem.js';
import { loadFragment } from '../../scripts/scripts.js';

/**
 * Wrap the text node of a link with a `span` element.
 * (!) Text node can also be positioned before the icon.
 * @param link {Element} The link element
 */
function wrapLinkTextNodeWithSpan(link) {
  Array.from(link.childNodes)
    .forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
        const span = document.createElement('span');
        span.classList.add('nav-main-link-label', 'visually-hidden');
        const textNode = node.cloneNode(true);
        span.appendChild(textNode);
        link.replaceChild(span, node);
      }
    });
}

/**
 * Function adds classes to the UL elements based on the depth of the list.
 * @param list {Element} The list element.
 */
function addNavLevelClasses(list) {
  /**
   * Calculate the depth of the given list.
   * @returns {number} The depth of the list.
   * @param element {Element} The list element.
   */
  function calculateDepth(element) {
    let depth = 0;
    let currentList = element;
    while (currentList.parentNode && currentList.parentNode.tagName === 'UL') {
      depth += 1;
      currentList = currentList.parentNode;
    }
    return depth;
  }

  /**
   * Add class to the UL element based on the depth of the list.
   */
  if (list.tagName === 'UL') {
    const level = calculateDepth(list) + 1;
    list.classList.add(`nav-main-level-${level}`);
  }

  /**
   * Recursively apply to all child UL lists
   */
  Array.from(list.children)
    .forEach((child) => {
      addNavLevelClasses(child);
    });
}

/**
 * Generate the main navigation
 */
async function generateMainNavigation() {
  const mainNavMeta = getMetadata('mainnav');
  const mainNavPath = mainNavMeta ? new URL(mainNavMeta).pathname : '/nav';
  const fragment = await loadFragment(mainNavPath);
  const mainNav = document.createElement('nav');
  const classes = [
    'main-navigation',
    'utility',
  ];

  mainNav.id = 'main-nav';

  /**
   * Iterate through the sections and decorating them.
   */
  while (fragment.firstElementChild) {
    const navSection = fragment.firstElementChild;
    const navLists = navSection.querySelectorAll('ul');
    const navSectionLinks = navSection.querySelectorAll('a');

    navSectionLinks.forEach((link) => {
      wrapLinkTextNodeWithSpan(link);
    });

    navLists.forEach((list) => {
      addNavLevelClasses(list);
    });

    mainNav.append(fragment.firstElementChild);
  }

  /**
   * Add the section names (Figma) as classes to the main navigation.
   */
  classes.forEach((c, i) => {
    const section = mainNav.children[i];
    if (section) {
      section.classList.add(`nav-${c}`);
    }
  });

  return mainNav;
}

export default async function decorate(block) {
  await loadCSS(`${window.hlx.codeBasePath}/styles/helpers/visually-hidden.css`);
  const mainNav = await generateMainNavigation();
  if (mainNav) {
    block.append(mainNav);
  }
}
