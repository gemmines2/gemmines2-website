// Statically pre-renders the product cards into products.html so search
// engine / Merchant Center crawlers see real product content in the raw
// HTML, instead of an empty <div> that only fills in after JavaScript runs.
//
// The client-side filter/sort script in products.html still works exactly
// as before — it just overwrites this pre-rendered markup once the page
// loads and the visitor changes a filter. This is progressive enhancement:
// first paint (and any crawler) sees real cards; JS enhances from there.
//
// Run this any time products-data.js changes, same as build-feed.js.

const fs = require('fs');
const vm = require('vm');

const src = fs.readFileSync('./products-data.js', 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src + '\nthis.PRODUCTS = PRODUCTS;', sandbox);
const PRODUCTS = sandbox.PRODUCTS;

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Same rendering rules as the renderProducts() function in products.html —
// keep these in sync if that function's markup ever changes.
function renderCard(p) {
  const weightStr = p.weight ? `${Number(p.weight).toFixed(2)} ct` : '';
  const meta = [p.origin, weightStr].filter(Boolean).join(' • ');
  const name = escapeHTML(p.name);
  const treatmentLabel = p.treatment === 'unheated' ? '✦ Natural Unheated' : '◈ Natural Heated';
  const treatmentClass = p.treatment === 'unheated' ? 'unheated' : 'heated';
  const priceStr = Number(p.price || 0).toFixed(2);
  const productLink = `product/${encodeURIComponent(p.id)}.html`;
  const addBtn = p.status === 'sold'
    ? `<button class="btn-add" disabled style="opacity:.5;cursor:not-allowed">Sold Out</button>`
    : `<button class="btn-add" onclick='Cart.add(${JSON.stringify(p)})'>+ Cart</button>`;

  return `
    <div class="prod-card">
      <div class="prod-img-wrap">
        <img src="${escapeHTML(p.image)}" alt="${name}" loading="lazy" width="400" height="400" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="fallback" style="display:none">\u{1F48E}</div>
      </div>
      <div class="prod-body">
        <div class="prod-treatment ${treatmentClass}">${treatmentLabel}</div>
        <div class="prod-name">${name}</div>
        <div class="prod-meta">${escapeHTML(meta)}</div>
        <div class="prod-footer">
          <div class="prod-price">$${priceStr}</div>
          <div class="prod-btns">
            <a href="${productLink}" class="btn-view">View Details</a>
            ${addBtn}
          </div>
        </div>
      </div>
    </div>`;
}

const active = PRODUCTS.filter(p => p.status !== 'draft');
const cardsHTML = active.map(renderCard).join('');

const START = '<!--STATIC_PRODUCTS_START-->';
const END = '<!--STATIC_PRODUCTS_END-->';

const templatePath = './products.html';
let html = fs.readFileSync(templatePath, 'utf8');

const startIdx = html.indexOf(START);
const endIdx = html.indexOf(END);
if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found in products.html — did the grid div get edited? Expected ' + START + ' ... ' + END);
  process.exit(1);
}

html = html.slice(0, startIdx + START.length) + cardsHTML + html.slice(endIdx);

// Also keep the "Showing N products" count accurate for the no-JS case.
html = html.replace(
  /id="productCount">[^<]*</,
  `id="productCount">Showing ${active.length} product${active.length !== 1 ? 's' : ''}<`
);

fs.writeFileSync(templatePath, html);
console.log(`Pre-rendered ${active.length} product cards into products.html`);
