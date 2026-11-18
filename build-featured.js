// build-featured.js
// Renders 4 products (one per stone type first) from products-data.js into index.html as static HTML,
// so search engines see them without running JavaScript.
// Usage: node build-featured.js

const fs = require('fs');
const vm = require('vm');

const COUNT = 4;
const START = '<!-- FEATURED:START -->';
const END = '<!-- FEATURED:END -->';

// Load PRODUCTS from products-data.js without modifying that file
const code = fs.readFileSync('products-data.js', 'utf8');
const ctx = { window: {}, module: { exports: {} }, console };
vm.createContext(ctx);
vm.runInContext(code + '\n;this.__P = (typeof PRODUCTS !== "undefined") ? PRODUCTS : null;', ctx);
const products = ctx.__P || ctx.window.PRODUCTS;
if (!Array.isArray(products)) {
  console.error('Could not find a PRODUCTS array in products-data.js');
  process.exit(1);
}

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Only show products that are for sale (status "active", or no status set)
const forSale = products.filter((p) => !p.status || String(p.status).toLowerCase() === 'active');

// 1) Products you tag with "featured": true come first
const picked = forSale.filter((p) => p.featured === true).slice(0, COUNT);

// 2) Then the first product of each stone type
const typeOf = (p) => String(p.gemType || p.shortName || '').toLowerCase();
const count = (t) => picked.filter((q) => typeOf(q) === t).length;
for (const p of forSale) {
  if (picked.length >= COUNT) break;
  if (!picked.includes(p) && count(typeOf(p)) === 0) picked.push(p);
}

// 3) Fill any gaps, at most 2 of the same stone type
for (const p of forSale) {
  if (picked.length >= COUNT) break;
  if (!picked.includes(p) && count(typeOf(p)) < 2) picked.push(p);
}
// 4) Last resort: anything left
for (const p of forSale) {
  if (picked.length >= COUNT) break;
  if (!picked.includes(p)) picked.push(p);
}

const cards = picked.map((p) => {
  const unheated = p.treatment === 'unheated';
  return `
    <a href="product/${esc(p.id)}.html" class="product-card">
      <div class="product-img-wrap">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" decoding="async">
      </div>
      <div class="product-info">
        <div class="product-treatment ${unheated ? 'treatment-unheated' : 'treatment-heated'}">
          ${unheated ? '✦ Natural Unheated' : '◈ Natural Heated'}
        </div>
        <div class="product-name">${esc(p.name)}</div>
        <div class="product-meta">${esc(p.origin)} · ${esc(p.weight)}</div>
        <div class="product-footer">
          <div class="product-price">$${Number(p.price).toFixed(2)}</div>
          <button class="product-add" data-id="${esc(p.id)}">Add to Cart</button>
        </div>
      </div>
    </a>`;
}).join('\n');

let html = fs.readFileSync('index.html', 'utf8');
const a = html.indexOf(START);
const b = html.indexOf(END);
if (a === -1 || b === -1 || b < a) {
  console.error(`Add ${START} and ${END} inside <div id="featuredGrid"> in index.html first.`);
  process.exit(1);
}
html = html.slice(0, a + START.length) + '\n' + cards + '\n    ' + html.slice(b);
fs.writeFileSync('index.html', html);
console.log(`Featured section rebuilt with ${Math.min(COUNT, products.length)} products.`);
