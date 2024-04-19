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
        span.classList.add('link-label', 'visually-hidden');
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
    list.classList.add(`main-nav-level-${level}`);
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
 * Set the current page link as active.
 * @description
 * The current page link is determined by comparing the `href` attribute of each link with
 * the current pathname.
 * The comparison is done without the trailing slash to ensure uniformity.
 * @param navMain {Element} The main navigation element.
 */
function setCurrentPageLink(navMain) {
  const path = window.location.pathname.replace(/\/$/, '');
  const links = navMain.querySelectorAll('a');

  links.forEach((link) => {
    // Remove trailing slash from the href attribute
    const href = link.getAttribute('href')
      .replace(/\/$/, '');

    if (href === path) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Set the expanded state of the main navigation.
 * @param mainNavWrapper {Element}
 */
function setExpandedState(mainNavWrapper) {
  const linksLevel1 = mainNavWrapper.querySelectorAll('.main-nav-level-1 a');
  const linkLabels = mainNavWrapper.querySelectorAll('.link-label');
  let isExpanded = false;
  let isMouseInside = false;

  /**
   * Update the visual state of the main navigation and its labels.
   * @param expand
   */
  function updateVisualState(expand) {
    mainNavWrapper.setAttribute('aria-expanded', expand ? 'true' : 'false');
    linkLabels.forEach((label) => {
      label.classList.toggle('visually-hidden', !expand);
    });
  }

  /**
   * General interaction handler for mouse and keyboard events.
   * 1. Check if mouseout/blur is going to an element outside the nav wrapper.
   * 2. On mouseover/focus within the nav, keep the nav expanded.
   * @param event {Event}
   */
  function handleInteraction(event) {
    switch (event.type) {
      case 'mouseover':
        isMouseInside = true;
        isExpanded = true;
        updateVisualState(true);
        break;
      case 'focus':
        isExpanded = true;
        updateVisualState(true);
        break;
      case 'mouseout':
        isMouseInside = false;
        if (!mainNavWrapper.contains(event.relatedTarget)) {
          // Delay to ensure that focus can return or another mouseover can occur
          setTimeout(() => {
            if (!isExpanded) {
              updateVisualState(false);
            }
          }, 100);
        }
        break;
      case 'blur':
        if (!mainNavWrapper.contains(event.relatedTarget) && !isMouseInside) {
          isExpanded = false;
          updateVisualState(false);
        }
        break;
      default:
        break;
    }
  }

  /**
   * Prevent the default click behavior when the nav wrapper is expanded and clicked on.
   * Ensure the nav stays expanded unless a link is specifically clicked.
   * @param event {Event} The click event.
   */
  function handleNavClick(event) {
    if (event.target === mainNavWrapper) {
      event.preventDefault();
      event.stopPropagation();
      if (!isExpanded) {
        isExpanded = true;
        updateVisualState(true);
      }
    }
  }

  function handleEscapeKey(event) {
    if (isMouseInside) {
      return;
    }
    if (event.key === 'Escape' || event.keyCode === 27) {
      isExpanded = false;
      updateVisualState(false);
    }
  }

  // Mouse events
  mainNavWrapper.addEventListener('mouseover', handleInteraction);
  mainNavWrapper.addEventListener('mouseout', handleInteraction);
  mainNavWrapper.addEventListener('click', handleNavClick, true);

  // Keyboard events
  linksLevel1.forEach((link) => {
    link.addEventListener('focus', handleInteraction);
    link.addEventListener('blur', handleInteraction);
  });

  document.addEventListener('keydown', handleEscapeKey);
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
      section.classList.add(`main-nav-${c}`);
    }
  });

  return mainNav;
}

/**
 * Decorate the main navigation block.
 * @param block
 * @returns {Promise<void>}
 */
export default async function decorate(block) {
  await loadCSS(`${window.hlx.codeBasePath}/styles/helpers/visually-hidden.css`);
  const mainNav = await generateMainNavigation();
  const mainNavWrapper = document.querySelector('.design-system-main-nav-wrapper');

  if (mainNav) {
    block.append(mainNav);
  }

  setCurrentPageLink(mainNav);
  setExpandedState(mainNavWrapper);
}
