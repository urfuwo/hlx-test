import metadata from './metadata.js';
import blogCtaBanner from './postCtaBanner.js';
import extractTags from './postTags.js';
import transformHero from './postHero.js';

export const transformers = [
  metadata,
  extractTags, // must be after metadata
  transformHero, // must be after metadata
  blogCtaBanner,
];

export const preTransformers = [
];
