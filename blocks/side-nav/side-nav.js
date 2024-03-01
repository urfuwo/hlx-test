import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

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

async function generateSideNavigation() {
  const template = getMetadata('template');
  if (template !== 'hub-l2') return null;
  const sideNavMeta = getMetadata('sideNav');
  const sideNavPath = sideNavMeta
    ? new URL(sideNavMeta).pathname
    : `/${window.location.pathname.split('/')[1]}/sidenav`;
  const sideFragment = await loadFragment(sideNavPath);
  if (!sideFragment) return null;
  const sideNav = document.createElement('aside');
  sideNav.id = 'sidenav';
  while (sideFragment.firstElementChild) sideNav.append(sideFragment.firstElementChild);
  const sideClasses = ['home', 'sections'];
  sideClasses.forEach((c, i) => {
    const section = sideNav.children[i];
    if (section) section.classList.add(`nav-side-${c}`);
  });
  const sideSections = sideNav.querySelector('.nav-side-sections');
  if (sideSections) {
    createDropMenu(sideSections);
  }
  const sideNavHome = sideNav.querySelector('.nav-side-home');
  sideNavHome.addEventListener('click', () => {
    const expanded = sideNav.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(sideNav);
    sideNav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
  return sideNav;
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const sideNav = await generateSideNavigation();
  if (sideNav) block.append(sideNav);
}
