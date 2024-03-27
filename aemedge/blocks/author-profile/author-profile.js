import { getMetadata } from '../../scripts/aem.js';
import { addAuthorProfiles } from '../author-profiles/author-profiles.js';

export default async function decorate(block) {
  const authorList = getMetadata('author');
  const keys = authorList ? authorList.split(',').map((e) => e.trim()) : [authorList];
  if (keys && keys.length > 0) {
    block.classList.add('author-profiles');
    block.classList.remove('author-profile');
    addAuthorProfiles(block, keys);
  }
}
