import { getMetadata } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { renderProfile } from '../../scripts/profile.js';
import { completeEntry } from '../../scripts/article.js';

async function getAuthorEntry(entryFilter) {
  const resultStream = await ffetch(`${window.hlx.codeBasePath}/authors-index.json`).filter(entryFilter).limit(1).all();
  const result = (!resultStream) ? { path: '/author/name', author: 'Name' } : resultStream[0];
  return completeEntry(result);
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
