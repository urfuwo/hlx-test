/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const { createWriteStream } = require('fs');
const { resolve } = require('path');
const { parser } = require('stream-json/Parser');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { streamValues } = require('stream-json/streamers/StreamValues');
const { disassembler } = require('stream-json/Disassembler');
const { pick } = require('stream-json/filters/Pick');
const { createGzip } = require('zlib');
const { SitemapStream, streamToPromise } = require('sitemap');
const { chain } = require('stream-chain');
const { ReadableWebToNodeStream } = require('readable-web-to-node-stream');

const formatDate = (value) => {
  try {
    return new Date(value * 1000).toISOString().split('T')[0];
  } catch (error) {
    console.error(error);
    return '';
  }
};

const collectTopics = async () => {
  const response = await fetch(
    'https://main--hlx-test--urfuwo.hlx.page/aemedge/articles-index.json',
  );
  const responseStream = new ReadableWebToNodeStream(response.body);
  const topicSet = new Set();
  const pipeline = chain([
    responseStream,
    parser(),
    pick({ filter: 'data' }),
    streamArray(),
    (data) => {
      const { value } = data;
      return JSON.parse(value.topics);
    },
    (data) => {
      data.split(',').forEach((entry) => {
        topicSet.add(entry.trim());
      });
    },
  ]);
  pipeline.on('finish', () => {
    console.log('topic set', topicSet);
  });
};

const writeSiteMap = async () => {
  const response = await fetch(
    'https://main--hlx-test--urfuwo.hlx.page/aemedge/authors-index.json',
  );
  const responseStream = new ReadableWebToNodeStream(response.body);
  const sitemap = new SitemapStream({ hostname: 'http://qa-sap.com' });
  const siteMapPath = resolve('../../', 'sitemap.xml');
  const writeStream = createWriteStream(siteMapPath);
  sitemap.pipe(writeStream);
  sitemap.pipe(createGzip());
  const pipeline = chain([
    responseStream,
    parser(),
    pick({ filter: 'data' }),
    streamArray(),
    (data) => {
      const { value } = data;
      sitemap.write({
        url: value.path,
        lastmod: formatDate(value.lastModified),
        changefreq: 'weekly',
      });
      return value;
    },
  ]);
  pipeline.on('data', (data) => console.debug('writing entry', data.path));
  pipeline.on('finish', () => {
    console.log('sitemap generated successfully at', siteMapPath);
  });
  pipeline.on('error', (e) => e.code === 'EPIPE' || console.error(e));
};

// writeSiteMap();

collectTopics();
