import { loadCSS } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import { renderProfile } from '../../scripts/profile.js';
import { getAuthorEntries } from '../../scripts/article.js';

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

export {
  addAuthorProfiles,
};
