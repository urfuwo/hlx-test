import metadata from './metadata.js';
import articleCtaBanner from './articleCtaBanner.js';
import articleHero from './articleHero.js';
import articleVideoHero from './articleVideoHero.js';
import authorProfile from './authorProfile.js';
import preProcessAuthorH1 from './preProcessAuthorH1.js';
import unwrapLightboxImages from './preProcessLightBoxImg.js';
import transformVideo from './youtubeVideo.js';
import articleMoreSection from './articleMoreSection.js';
import articleQuote from './articleQuote.js';
import articlePageFooter from './articlePageFooter.js';
import articleContentFooter from './articleContentFooter.js';
import articleInfo from './articleInfo.js';
import articlePanel from './articlePanel.js';

export const transformers = [
  metadata,
  articleHero,
  articleVideoHero,
  articleCtaBanner,
  articleMoreSection,
  articleInfo,
  articleContentFooter,
  articleQuote,
  articlePanel,
  articlePageFooter,
  authorProfile,
  transformVideo,
];

export const preTransformers = [
  preProcessAuthorH1,
  unwrapLightboxImages,
];
