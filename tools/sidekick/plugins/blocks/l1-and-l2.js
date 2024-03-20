import { decorate as decorateBlocks } from './blocks.js';

export async function decorate(container, data, searchTerm, context) {
  return decorateBlocks(container, data, searchTerm, context);
}

export default {
  title: 'L1-and-L2',
  searchEnabled: false,
};
