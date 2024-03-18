import { getMetadata } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { renderProfile, completeEntry } from '../../libs/profile/profile.js';

async function getAuthorEntry(entryFilter) {
  const result = await ffetch(`${window.hlx.codeBasePath}/authors-index.json`).filter(entryFilter).limit(1).all();
  return (!result || result.length < 1) ? null : completeEntry(result[0]);
}

export default async function decorate(block) {
  // #todo: handle multiple authors
  const name = getMetadata('author');
  const entryFilter = ((entry) => entry.author === name);
  const entry = await getAuthorEntry(entryFilter);
  if (entry) {
    const authorProfile = await renderProfile(entry);
    block.classList.add('ver');
    block.append(authorProfile);
  } else {
    block.parentNode.remove();
  }
}
