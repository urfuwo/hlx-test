import metadata from './metadata.js';
import articleTitle from './articleTitle.js';
import sectionTitle from './sectionTitle.js';
import sectionBar from './sectionBar.js';

export const transformers = [
  metadata,
  articleTitle,
  sectionTitle,
  sectionBar,
];

export const preTransformers = [];
