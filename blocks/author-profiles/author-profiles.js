import { loadCSS } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { div } from '../../scripts/dom-builder.js';
import { completeEntry, renderProfile } from '../author-profile/author-profile.js';

async function getAuthorEntries(keys) {
  const entryFilter = ((entry) => (keys.includes(entry.author) || keys.includes(entry.path)));
  const unsortedEntries = await ffetch('/authors-index.json').filter(entryFilter).limit(keys.length).all();
  const sortedEntries = [];
  keys.forEach((key) => {
    // eslint-disable-next-line max-len
    sortedEntries.push(completeEntry(unsortedEntries.find((entry) => (key === entry.author || key === entry.path))));
  });
  return sortedEntries;
}

async function addAuthorProfiles(block, keys) {
  const entries = await getAuthorEntries(keys);
  if (keys.length > 1) {
    block.classList.add(`elems${Math.min(keys.length, 3)}`);
    entries.forEach((entry) => {
      const profile = div({ class: 'author-profile hor' }, renderProfile(entry));
      block.append(profile);
    });
  } else {
    block.classList.add('vertical');
    block.append(div({ class: 'author-profile' }, renderProfile(entries[0])));
  }
}

export default async function decorateBlock(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/author-profile/author-profile.css`);
  const keys = [];
  block.querySelectorAll(':scope p').forEach((para) => {
    const link = para.querySelector('a');
    keys.push(link ? (new URL(link.href).pathname) : para.innerText);
  });
  if (keys.length === 0) {
    keys.push(block.querySelector(':scope div div').innerText);
  }
  block.innerHTML = '';
  await addAuthorProfiles(block, keys);
}
