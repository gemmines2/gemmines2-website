// Regenerates feed.xml and feed.csv from products-data.js
// Uses the exact same field-building rules as generate-merchant-feed.html
const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync('./products-data.js', 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src + '\nthis.PRODUCTS = PRODUCTS;', sandbox);
const PRODUCTS = sandbox.PRODUCTS;

const BASE_URL = 'https://gemmines2.github.io/gemmines2-website/';

function escapeXML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getCondition() { return 'new'; }
function getAvailability(p) { return (p.status === 'sold') ? 'out_of_stock' : 'in_stock'; }
function getGoogleCategory(p) {
  if (p.type === 'jewelry') return 'Apparel &amp; Accessories &gt; Jewelry';
  return 'Arts &amp; Entertainment &gt; Hobbies &amp; Creative Arts &gt; Collectibles &gt; Gemstones';
}
function buildTitle(p) {
  let title = p.name || '';
  if (title.length > 150) title = title.substring(0, 147) + '...';
  return title;
}
function buildDescription(p) {
  let desc = p.description || '';
  desc = desc.replace(/#\w+/g, '').trim();
  if (desc.length > 5000) desc = desc.substring(0, 4997) + '...';
  if (!desc) desc = `Natural ${p.gemType || 'gemstone'} from ${p.origin || 'Pakistan'}. ${p.treatment === 'unheated' ? 'Unheated and untreated.' : 'Heat treated.'} ${p.weight ? p.weight + ' carats.' : ''} ${p.clarity || ''}`.trim();
  return desc;
}
function getImageURL(p) {
  const img = (p.images && p.images[0]) || p.image || '';
  if (!img) return '';
  if (img.startsWith('http')) return img;
  return BASE_URL + img;
}

const active = PRODUCTS.filter(p => p.status !== 'sold' && p.status !== 'draft');
let skipped = [];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Gemmines2 — Natural Certified Gemstones</title>
    <link>${BASE_URL}</link>
    <description>100% natural, unheated certified gemstones from Pakistan and Sri Lanka. Ethically sourced, worldwide shipping.</description>
`;

const headers = ['id','title','description','link','image_link','price','availability','condition','brand','google_product_category','mpn','color','material','identifier_exists'];
let csv = headers.join('\t') + '\n';

active.forEach(p => {
  const imageURL = getImageURL(p);
  if (!imageURL || !p.price) { skipped.push(p.id + ' (missing image or price)'); return; }

  const productURL = `${BASE_URL}product/${encodeURIComponent(p.id)}.html`;
  const title = escapeXML(buildTitle(p));
  const desc = escapeXML(buildDescription(p));
  const price = Number(p.price).toFixed(2);
  const weight = p.weight ? `${p.weight} ct` : '';
  const condition = getCondition(p);
  const availability = getAvailability(p);
  const category = getGoogleCategory(p);
  const brand = 'Gemmines2';
  const treatment = p.treatment === 'unheated' ? 'Unheated Untreated' : 'Heat Treated';

  xml += `
    <item>
      <g:id>${escapeXML(p.id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${desc}</g:description>
      <g:link>${productURL}</g:link>
      <g:image_link>${escapeXML(imageURL)}</g:image_link>
      <g:price>${price} USD</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>${condition}</g:condition>
      <g:brand>${brand}</g:brand>
      <g:google_product_category>${category}</g:google_product_category>
      <g:product_type>${escapeXML(p.gemType || p.type || 'Gemstone')}</g:product_type>
      <g:mpn>${escapeXML(p.id)}</g:mpn>
      <g:shipping>
        <g:country>PK</g:country>
        <g:service>Standard</g:service>
        <g:price>0 USD</g:price>
      </g:shipping>
      <g:identifier_exists>false</g:identifier_exists>${p.origin ? `
      <g:material>${escapeXML(p.origin)} Origin${weight ? ' — ' + weight : ''}</g:material>` : ''}${p.color ? `
      <g:color>${escapeXML(p.color)}</g:color>` : ''}${treatment ? `
      <g:pattern>${escapeXML(treatment)}</g:pattern>` : ''}${p.images && p.images[1] ? `
      <g:additional_image_link>${escapeXML(BASE_URL + p.images[1])}</g:additional_image_link>` : ''}
    </item>`;

  const csvDesc = buildDescription(p).replace(/\t/g, ' ').replace(/\n/g, ' ');
  const csvTitle = buildTitle(p).replace(/\t/g, ' ');
  const csvPrice = Number(p.price).toFixed(2) + ' USD';
  const csvMaterial = `${p.origin || 'Pakistan'} Origin${weight ? ' ' + weight : ''} — ${treatment}`;
  const row = [p.id, csvTitle, csvDesc, productURL, imageURL, csvPrice, availability, condition, brand,
    'Arts & Entertainment > Hobbies & Creative Arts > Collectibles > Gemstones', p.id, p.color || '', csvMaterial, 'false'];
  csv += row.join('\t') + '\n';
});

xml += `
  </channel>
</rss>`;

fs.writeFileSync('feed.xml', xml);
fs.writeFileSync('feed.csv', csv);

console.log('Total products in data file:', PRODUCTS.length);
console.log('Active (non-sold/draft):', active.length);
console.log('Included in feed:', active.length - skipped.length);
if (skipped.length) console.log('Skipped (missing image/price):', skipped);
