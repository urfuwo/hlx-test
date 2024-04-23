import { loadCSS } from '../../scripts/aem.js';
import {
  a,
  div,
  img,
  li,
  span,
  ul,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';
import { convertStringToKebabCase } from '../../scripts/utils.js';

const QUERY_INDEX_URL = '/design-system/fiori-design-web/mock-query-index.json';
const VALUE_SEPARATOR = ',';

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
  const linksLevel1 = mainNavWrapper.querySelectorAll('.main-nav__category-header-link');
  const linkLabels = mainNavWrapper.querySelectorAll('.main-nav__category-header-label');
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
        isExpanded = false;
        updateVisualState(false);
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
  function handleNavWrapperClick(event) {
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
  mainNavWrapper.addEventListener('click', handleNavWrapperClick, true);

  // Keyboard events
  linksLevel1.forEach((link) => {
    link.addEventListener('focus', handleInteraction);
    link.addEventListener('blur', handleInteraction);
  });

  document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Create the main navigation structure with sublists for each category.
 * @param data {Array} The data to be used for creating the navigation.
 * @returns {Element} The main navigation container.
 */
function createMainNav(data) {
  const container = div({ class: ['main-nav__container'] });
  const navSectionUtilities = div({ class: ['main-nav__section', 'main-nav__section-utility'] });
  const navSectionMain = div({ class: ['main-nav__section', 'main-nav__section-main'] });
  let currentCategory = null;
  let currentList = null;
  let sublist = null;

  data.forEach((item) => {
    const parts = item.breadcrumbs.split(VALUE_SEPARATOR);
    const category = parts[0];
    // Determine the target container for the sublist
    const targetContainer = (['Learning', 'Community', 'Support'].includes(category)) ? navSectionUtilities : navSectionMain;

    /**
     * Create a list item link (subentries) and append it to the sublist.
     */
    function createListItemLink() {
      const listItem = li();
      const link = a(
        { href: item.path },
        `${parts.slice(1)
          .join(', ')}`,
      );
      listItem.appendChild(link);
      sublist.appendChild(listItem);
    }

    /**
     * Create the lists for each category.
     */
    function createLists() {
      currentCategory = category;
      currentList = ul({ class: ['main-nav__list-level-1', 'main-nav__list'] });
      const categoryHeader = li(
        {
          class: 'main-nav__category-header',
        },
        a(
          {
            class: 'main-nav__category-header-link',
            href: '#',
            'data-category': convertStringToKebabCase(category),
            title: `Expand/Collapse ${category} category`,
          },
          span(
            {
              class: 'main-nav__category-header-icon',
            },
            img({
              src: `${window.hlx.codeBasePath}/icons/${convertStringToKebabCase(category)}.svg`,
              alt: `${category} Icon`,
              loading: 'lazy',
            }),
          ),
          span({
            class: [
              'main-nav__category-header-label',
              'visually-hidden',
            ],
          }, category),
        ),
      );
      sublist = ul({ class: ['main-nav__list-level-2', 'main-nav__list'] });
      categoryHeader.appendChild(sublist);
      currentList.appendChild(categoryHeader);
      targetContainer.appendChild(currentList);
    }

    if (category !== currentCategory) {
      createLists();
    }

    if (item.path) {
      createListItemLink();
    }
  });

  // Append the main and utility sections to the container
  container.appendChild(navSectionMain);
  // Append the utility section only if it contains items
  if (navSectionUtilities.childNodes.length > 0) {
    container.appendChild(navSectionUtilities);
  }

  return container;
}

export default async function decorate(block) {
  await loadCSS(`${window.hlx.codeBasePath}/styles/helpers/visually-hidden.css`);
  const mainNavData = await ffetch(QUERY_INDEX_URL)
    .all();
  const mainNav = createMainNav(mainNavData);
  const mainNavWrapper = document.querySelector('.design-system-main-nav-wrapper');

  if (mainNav) {
    block.append(mainNav);
  }

  setCurrentPageLink(mainNav);
  setExpandedState(mainNavWrapper);
}
