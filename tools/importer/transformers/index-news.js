import metadata from './metadata-news.js';
import articlePromo from './articlePromo.js';
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
import transformLightboxImages from './articleLightboxImages.js';
import transformVimeoVideo from './vimeoVideo.js';

export const transformers = [
  metadata,
  articleHero,
  articleVideoHero,
  articlePromo,
  articleIntro,
  articleQuote,
  articlePanel,
  articleSidebar,
  articleContentFooter,
  articlePageFooter,
  articleMoreSection,
  authorProfile,
  transformLightboxImages,
  transformVideo,
  transformVimeoVideo,
];

export const preTransformers = [
  preProcessAuthorH1,
  preProcessArticleFootnote,
  unwrapLightboxImages,
];
