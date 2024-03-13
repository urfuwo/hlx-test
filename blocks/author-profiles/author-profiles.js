import { loadCSS } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { div } from '../../scripts/dom-builder.js';
import { completeEntry, renderProfile } from '../author-profile/author-profile.js';

async function getAuthorEntries(keys) {
  const entryFilter = ((entry) => (keys.includes(entry.path)));
  const unsortedEntries = await ffetch('/authors-index.json').filter(entryFilter).limit(keys.length).all();
  const sortedEntries = [];
  if (unsortedEntries) {
    keys.forEach((key) => {
      sortedEntries.push(completeEntry(unsortedEntries.find((entry) => (key === entry.path))));
    });
  }
  return sortedEntries;
}

async function addAuthorProfiles(block, keys) {
  const entries = await getAuthorEntries(keys);
  if (entries && entries.length) {
    if (keys.length > 1) {
      block.classList.add(`elems${keys.length}`);
      entries.forEach((entry) => {
        const profile = div({ class: 'author-profile hor' }, renderProfile(entry));
        block.append(profile);
      });
    } else {
      block.classList.add('vertical');
      block.append(div({ class: 'author-profile' }, renderProfile(entries[0])));
    }
  } else {
    block.parentNode.remove();
  }
}

export default async function decorateBlock(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/author-profile/author-profile.css`);
  const keys = [];
  block.querySelectorAll('a').forEach((link) => {
    keys.push(new URL(link.href).pathname);
  });
  block.innerHTML = '';
  await addAuthorProfiles(block, keys);
}
