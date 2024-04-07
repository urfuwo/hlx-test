import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../../scripts/scripts.js';

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
  const sideNavMeta = getMetadata('sidenav');
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
  sideNav.querySelectorAll('.default-content-wrapper a').forEach((link) => {
    const href = new URL(link.href);
    if (window.location.pathname === href.pathname) {
      link.setAttribute('aria-current', 'page');
    }
  });
  return sideNav;
}

export default async function decorate(block) {
  const sideNav = await generateSideNavigation();
  if (sideNav) block.append(sideNav);
}
