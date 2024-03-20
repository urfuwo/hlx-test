import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadBlocks,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
async function loadFragment(path) {
  if (path && path.startsWith('/') && path.includes('/fragments/')) {
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

function findAndMarkFragmentLinks(block) {
  const links = block.querySelectorAll('a');
  [...links].forEach((link) => {
    const path = link.getAttribute('href');
    if (path && path.startsWith('/') && path.includes('/fragments/')) {
      link.classList.add('fragment-link');
    }
  });
}

async function replaceLinkWithFragment(block, col, link) {
  const path = link.getAttribute('href');
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      block.closest('.section').classList.add(...fragmentSection.classList);
      let linkParent = link.parentNode;
      if (linkParent.childNodes.length === 1) {
        while (linkParent.parentNode !== col && linkParent.childNodes.length === 1) {
          linkParent = linkParent.parent;
        }
        linkParent.replaceWith(...fragment.childNodes);
      } else {
        link.replaceWith(...fragment.childNodes);
      }
    }
  }
}

function removeButtonContainerClassWithNoLinks(block) {
  const buttonContainers = block.querySelectorAll('.button-container');
  [...buttonContainers].forEach((bc) => {
    const links = bc.querySelectorAll('a:not(.fragment-link)');
    if (links.length === 0) {
      bc.classList.remove('button-container');
    }
  });
}

function convertFragmentLinksToFragments(block) {
  [...block.children].forEach(async (row) => {
    [...row.children].forEach(async (col) => {
      const links = col.querySelectorAll('a.fragment-link');
      [...links].forEach(async (link) => {
        replaceLinkWithFragment(block, col, link);
      });
    });
  });
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  findAndMarkFragmentLinks(block);

  removeButtonContainerClassWithNoLinks(block);

  convertFragmentLinksToFragments(block);
}
