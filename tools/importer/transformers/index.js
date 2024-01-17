import metadata from './metadata.js';
import artcileCtaBanner from './articleCtaBanner.js';
import extractTags from './articleTags.js';
import articleHero from './articleHero.js';
import authorProfile from './authorProfile.js';
import preProcessArticleSection from './preProcessArticleSection.js';
import preProcessAuthorH1 from './preProcessAuthorH1.js';

export const transformers = [
  metadata,
  extractTags, // must be after metadata
  articleHero, // must be after metadata
  artcileCtaBanner,
  authorProfile,
];

export const preTransformers = [
  preProcessArticleSection,
  preProcessAuthorH1
];
