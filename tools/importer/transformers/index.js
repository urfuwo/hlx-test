import metadata from './metadata.js';
import artcileCtaBanner from './articleCtaBanner.js';
import extractTags from './articleTags.js';
import articleHero from './articleHero.js';
import authorProfile from './authorProfile.js';

export const transformers = [
  metadata,
  extractTags, // must be after metadata
  articleHero, // must be after metadata
  artcileCtaBanner,
  authorProfile,
];

export const preTransformers = [
];
