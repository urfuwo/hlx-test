import { decorate as decorateBlocks } from './blocks.js';

export async function decorate(container, data, searchTerm, context) {
  return decorateBlocks(container, data, searchTerm, context);
}

export default {
  title: 'Articles',
  searchEnabled: false,
};
