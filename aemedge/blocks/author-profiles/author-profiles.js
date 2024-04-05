import { loadCSS } from '../../scripts/aem.js';
import { getAuthorEntries } from '../../scripts/article.js';
import Profiles from '../../libs/profiles/profiles.js';

async function addAuthorProfiles(block, keys) {
  const entries = await getAuthorEntries(keys);
  if (entries && entries.length) {
    const profiles = new Profiles(entries, 'author').render();
    profiles.classList.add(...block.classList);
    block.replaceWith(profiles);
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

export { addAuthorProfiles };
