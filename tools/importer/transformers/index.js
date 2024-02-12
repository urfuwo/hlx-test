import metadata from './metadata.js';
import articleCtaBanner from './articleCtaBanner.js';
import articleHero from './articleHero.js';
import authorProfile from './authorProfile.js';
import preProcessAuthorH1 from './preProcessAuthorH1.js';
import transformVideo from './youtubeVideo.js';
import articleMoreSection from './articleMoreSection.js';
import articleQuote from './articleQuote.js';
import articleFooter from './articleContentFooter.js';

export const transformers = [
  metadata,
  articleHero,
  articleCtaBanner,
  articleMoreSection,
  articleQuote,
  articleFooter,
  authorProfile,
  transformVideo,
];

export const preTransformers = [
  preProcessAuthorH1,
];
