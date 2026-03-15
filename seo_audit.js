
import fs from 'fs';
import path from 'path';

const indexPath = 'c:/Users/tatek/Desktop/VS Code/mario/gh-pages/namibia-rundreisen/index.html';
const content = fs.readFileSync(indexPath, 'utf-8');

console.log('--- SEO Baseline Audit ---');

// Title
const titleMatch = content.match(/<title>(.*?)<\/title>/);
console.log(`Title: ${titleMatch ? titleMatch[1] : 'MISSING'}`);

// Description
const descMatch = content.match(/<meta name="description"[\s\S]*?content="([\s\S]*?)"/);
console.log(`Description: ${descMatch ? descMatch[1].trim() : 'MISSING'}`);

// Canonical
const canonicalMatch = content.match(/<link rel="canonical" href="(.*?)"/);
console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : 'MISSING'}`);

// OG Tags
const ogTags = content.match(/<meta property="og:.*?"/g);
console.log(`OG Tags: ${ogTags ? ogTags.length : '0'}`);

// Twitter Tags
const twitterTags = content.match(/<meta name="twitter:.*?"/g);
console.log(`Twitter Tags: ${twitterTags ? twitterTags.length : '0'}`);

// H1
const h1Match = content.match(/<h1.*?>([\s\S]*?)<\/h1>/);
console.log(`H1: ${h1Match ? h1Match[1].trim().replace(/<.*?>/g, '') : 'MISSING'}`);

// Images without Alt or generic alt
const imgTags = content.match(/<img.*?>/g) || [];
let genericAlt = 0;
let missingAlt = 0;
imgTags.forEach(img => {
    if (!img.includes('alt=')) missingAlt++;
    if (img.includes('alt="Namibia Impressionen"') || img.includes('alt="Namibia Natur"') || img.includes('alt="Namibia Abschluss"')) genericAlt++;
});
console.log(`Total Images: ${imgTags.length}`);
console.log(`Missing Alt: ${missingAlt}`);
console.log(`Generic Alt: ${genericAlt}`);

// Schema
const schemaMatch = content.match(/<script type="application\/ld\+json">/);
console.log(`JSON-LD Schema: ${schemaMatch ? 'PRESENT' : 'MISSING'}`);
