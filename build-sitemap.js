// build-sitemap.js
// Regenerates sitemap.xml with correct .html extensions and the current
// product list (pointing at the static /product/<id>.html pages).
const fs = require('fs');
const vm = require('vm');

const src = fs.readFileSync('./products-data.js', 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src + '\nthis.PRODUCTS = PRODUCTS;', sandbox);
const PRODUCTS = sandbox.PRODUCTS;

const BASE_URL = 'https://gemmines2.github.io/gemmines2-website/';
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  ['', '1.0', 'weekly'],
  ['products.html', '0.9', 'daily'],
  ['about.html', '0.8', 'monthly'],
  ['contact.html', '0.7', 'monthly'],
  ['cart.html', '0.5', 'monthly'],
  ['return.html', '0.6', 'yearly'],
  ['shipping.html', '0.6', 'yearly'],
  ['privacy.html', '0.5', 'yearly'],
  ['terms.html', '0.5', 'yearly'],
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';

staticPages.forEach(([page, prio, freq]) => {
  xml += `  <url>\n    <loc>${BASE_URL}${page}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>\n`;
});

xml += '\n';

const active = PRODUCTS.filter(p => p.status !== 'sold' && p.status !== 'draft');
active.forEach(p => {
  const prio = p.rare ? '0.9' : '0.8';
  xml += `  <url>\n    <loc>${BASE_URL}product/${encodeURIComponent(p.id)}.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${prio}</priority>\n  </url>\n`;
});

xml += '\n</urlset>';
fs.writeFileSync('sitemap.xml', xml);
console.log(`Sitemap regenerated: ${staticPages.length + active.length} URLs (${active.length} products).`);
