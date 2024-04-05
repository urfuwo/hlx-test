import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), '../../sitemap_index.xml');
const xmlFile = readFileSync(sitemapPath, 'utf8');
const parser = new XMLParser();
const json = parser.parse(xmlFile);

console.log(JSON.stringify(json));
