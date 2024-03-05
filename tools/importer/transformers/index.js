import metadata from './metadata.js';
import articleCtaBanner from './articleCtaBanner.js';
import articleHero from './articleHero.js';
import articleVideoHero from './articleVideoHero.js';
import authorProfile from './authorProfile.js';
import preProcessAuthorH1 from './preProcessAuthorH1.js';
import preProcessArticleFootnote from './preProcessArticleFootnote.js';
import unwrapLightboxImages from './preProcessLightBoxImg.js';
import transformVideo from './youtubeVideo.js';
import articleMoreSection from './articleMoreSection.js';
import articleQuote from './articleQuote.js';
import articlePageFooter from './articlePageFooter.js';
import articleContentFooter from './articleContentFooter.js';
import articleIntro from './articleIntro.js';
import articlePanel from './articlePanel.js';
import articleSidebar from './articleSidebar.js';

export const transformers = [
  metadata,
  articleHero,
  articleVideoHero,
  articleCtaBanner,
  articleIntro,
  articleQuote,
  articlePanel,
  articleSidebar,
  articleContentFooter,
  articlePageFooter,
  articleMoreSection,
  authorProfile,
  transformVideo,
];

export const preTransformers = [
  preProcessAuthorH1,
  preProcessArticleFootnote,
  unwrapLightboxImages,
];