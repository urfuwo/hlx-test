#!/usr/bin/env node

import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), '../../sitemap_index.xml');
const xmlFile = readFileSync(sitemapPath, 'utf8');
const parser = new XMLParser();
const json = parser.parse(xmlFile);

// console.log(JSON.stringify(json));

const buildSiteMapEntry = (loc, lastMod) => ({ loc, lastMod });

const buildSitemap = () => {
  const array = ['loc1', 'loc2', 'loc3'];
  const urls = array.map((e) => buildSiteMapEntry(e, 'lastmod'));
  const builder = new XMLBuilder({
    arrayNodeName: 'url',
  });
  const siteMap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${builder.build(urls)}
  </urlset>`;
  console.log(siteMap);
};

buildSitemap();
