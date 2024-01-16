import metadata from './metadata.js';
import blogCtaBanner from './postCtaBanner.js';
import extractTags from './postTags.js';

export const transformers = [
  metadata,
  extractTags, // must be after metadata
  blogCtaBanner,
];

export const preTransformers = [

];
