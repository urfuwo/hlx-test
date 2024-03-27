import metadata from './metadata-insights.js';
import articlePromo from './articlePromo.js';
import articleHero from './articleHero.js';
import articleVideoHero from './articleVideoHero.js';
import authorProfile from './authorProfile.js';
import transformVideo from './youtubeVideo.js';
import articleMoreSection from './articleMoreSection.js';
import articleQuote from './articleQuote.js';
import articlePageFooter from './articlePageFooter.js';
import articleContentFooter from './articleContentFooter.js';
import articleIntro from './articleIntro.js';
import articlePanel from './articlePanel.js';
import articleAccordion from './articleAccordion.js';
import articleTable from './articleTable.js';
import cleanUpImgSrc from './preProcessInsightsImgs.js';

export const transformers = [
  metadata,
  articleHero,
  articleVideoHero,
  articlePromo,
  articleIntro,
  articleQuote,
  articleAccordion,
  articleTable,
  articlePanel,
  articleContentFooter,
  articlePageFooter,
  articleMoreSection,
  authorProfile,
  transformVideo,
];

export const preTransformers = [
  cleanUpImgSrc,
];
