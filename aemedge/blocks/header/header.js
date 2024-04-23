import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { loadFragment } from '../../scripts/scripts.js';
import {
  div, span, input, p, button, a, nav as navBuilder,
} from '../../scripts/dom-builder.js';
import Button from '../../libs/button/button.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const navElement = document.getElementById('nav');
    const navSections = navElement.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(navElement, navSections);
      navElement.querySelector('button').focus();
    }
  }
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections
    .querySelectorAll('.nav-sections .default-content-wrapper > ul > li')
    .forEach((section) => {
      section.setAttribute('aria-expanded', expanded);
    });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const menuButton = nav.querySelector('.burger-menu button');
  document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  menuButton.setAttribute('aria-current', !expanded);
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

function addSearchBar(element) {
  const searchBar = div(
    { class: 'search-bar' },
    div(
      { class: 'text-box' },
      span({ class: 'label-text' }),
      div({ class: 'voice-search' }, div({ class: 'microphone' })),
      div({ class: 'search' }, div({ class: 'search-e' })),
    ),
    input({ class: 'search-box', placeholder: 'Search' }),
  );
  element.prepend(searchBar);
}

function getNavBar(nav) {
  const navBar = div({ class: 'nav-bar' });
  const classes = ['sections', 'explore', 'tools'];
  classes.forEach((c) => {
    const section = nav.querySelector(`.nav-${c}`);
    if (section) {
      navBar.append(section);
    }
  });
  return navBar;
}

function getActionBar(nav, navSections) {
  const openButton = p(
    { class: 'button-container burger-menu' },
    button(
      {
        class: 'button',
        type: 'button',
        'aria-controls': 'nav',
        'aria-label': 'Open Navigation',
      },
      span({ class: 'icon icon-burger' }),
    ),
  );
  openButton.addEventListener('click', () => toggleMenu(nav, navSections));
  const closeButton = p(
    { class: 'button-container close-menu' },
    button(
      {
        class: 'button',
        type: 'button',
        'aria-controls': 'nav',
        'aria-label': 'Close Navigation',
      },
      span({ class: 'icon icon-close' }),
    ),
  );
  closeButton.addEventListener('click', () => {
    nav.setAttribute('aria-expanded', 'false');
    nav.querySelector('.burger-menu button').setAttribute('aria-current', false);
    document.body.style.overflowY = '';
  });
  const separator = div({ class: 'separator' });

  const actionBar = div({ class: 'nav-actions', id: 'action-buttons' });
  actionBar.append(openButton);
  actionBar.append(separator);
  actionBar.append(closeButton);
  const navTools = nav.querySelector('.nav-tools');
  navTools.querySelectorAll(':scope p').forEach((tool) => {
    const toolElement = tool.cloneNode(true);
    actionBar.prepend(toolElement);
  });
  decorateIcons(openButton);
  decorateIcons(closeButton);
  return actionBar;
}

function decorateLogo(nav) {
  const navBrand = nav.querySelector('.nav-brand');
  const brandLogo = div(
    { class: 'logo' },
    a(
      {
        href: '/',
        title: 'SAP',
        'aria-label': 'SAP',
      },
      span({ class: 'icon icon-brand' }),
    ),
  );
  const brandElementsWrapper = navBrand.firstElementChild;
  if (
    brandElementsWrapper != null
    && brandElementsWrapper.classList.contains('default-content-wrapper')
  ) {
    brandElementsWrapper.prepend(brandLogo);
  } else {
    navBrand.prepend(brandLogo);
  }
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }
  const brandElement = navBrand.querySelectorAll('p');
  brandElement[0].classList.add('site-label');
  decorateIcons(brandLogo);
}

function createDropMenu(sections) {
  sections.querySelectorAll(':scope > .default-content-wrapper > ul > li').forEach((section) => {
    if (section.querySelector('ul')) section.classList.add('nav-drop', 'text');
    section.addEventListener('click', () => {
      const expanded = section.getAttribute('aria-expanded') === 'true';
      toggleAllNavSections(sections);
      section.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });
}

async function generateTopNavigation() {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  const primaryNav = navBuilder({ id: 'nav-primary', 'aria-label': 'primary navigation' });
  while (fragment.firstElementChild) primaryNav.append(fragment.firstElementChild);
  const classes = ['brand', 'sections', 'explore', 'tools'];
  classes.forEach((c, i) => {
    const section = primaryNav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });
  // populate logo
  decorateLogo(primaryNav);

  // generate links
  const navSections = primaryNav.querySelector('.nav-sections');
  if (navSections) {
    createDropMenu(navSections);
    addSearchBar(navSections);
  }
  primaryNav.setAttribute('aria-expanded', 'false');
  primaryNav.append(getNavBar(primaryNav));
  const actionBar = getActionBar(primaryNav, navSections);
  primaryNav.append(actionBar);
  return primaryNav;
}

async function generateSecondaryNavigation() {
  const navMeta = getMetadata('global-nav');
  const secondaryNavPath = navMeta
    ? new URL(navMeta).pathname
    : `/${window.location.pathname.split('/')[1]}/sidenav`;
  const navFragment = await loadFragment(secondaryNavPath);
  if (!navFragment) return null;
  const secondNav = navBuilder({ id: 'nav-secondary', 'aria-label': 'secondary navigation' });
  while (navFragment.firstElementChild) secondNav.append(navFragment.firstElementChild);
  const navClasses = ['title', 'tabs', 'action'];
  navClasses.forEach((c, i) => {
    const section = secondNav.children[i];
    if (section) section.classList.add(`nav-secondary-${c}`);
  });
  const sideSections = secondNav.querySelector('.nav-secondary-tabs');
  if (sideSections) {
    createDropMenu(sideSections);
  }
  sideSections.querySelectorAll('a').forEach((link) => {
    const href = new URL(link.href);
    if (window.location.pathname === href.pathname) {
      link.parentElement.setAttribute('aria-current', 'page');
    }
  });
  const navCtaText = secondNav.querySelector('.nav-secondary-action');
  const navCta = new Button(navCtaText.querySelector('a').textContent);
  navCtaText.append(navCta.render());
  navCtaText.firstElementChild.remove();
  const navTitle = secondNav.querySelector('.nav-secondary-title');
  navTitle.addEventListener('click', () => {
    const expanded = secondNav.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(secondNav);
    secondNav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
  secondNav.querySelectorAll('.default-content-wrapper a').forEach((link) => {
    const href = new URL(link.href);
    if (window.location.pathname === href.pathname) {
      link.setAttribute('aria-current', 'page');
    }
  });
  return secondNav;
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const nav = await generateTopNavigation();
  if (nav) block.append(nav);
  const secondNav = await generateSecondaryNavigation();
  if (secondNav) block.append(secondNav);
  document.addEventListener('click', (event) => {
    if (nav.contains(event.target)) return;
    toggleAllNavSections(nav);
    nav.setAttribute('aria-expanded', 'false');
  });
}
