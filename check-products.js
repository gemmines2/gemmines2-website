// check-products.js : run with  node check-products.js
// Checks products-data.js for syntax errors, missing fields, duplicate ids and missing image/video files.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILE = process.argv[2] || 'products-data.js';
const ROOT = path.dirname(path.resolve(FILE));
const REQUIRED = ['id', 'name', 'type', 'price', 'status', 'image', 'images'];
const TYPES = ['cut', 'rough', 'jewelry'];
let errors = 0, warnings = 0;
const bad = m => { console.log('  ✗ ' + m); errors++; };
const warn = m => { console.log('  ! ' + m); warnings++; };

if (!fs.existsSync(FILE)) { console.log('Cannot find ' + FILE + '. Run this from your repo folder.'); process.exit(1); }
const src = fs.readFileSync(FILE, 'utf8');

// 1. Syntax check (curly quotes used as code quotes also show up here), with the lines around the error
const m = src.match(/(?:const|let|var)\s+(\w+)\s*=\s*\[/) || src.match(/(?:window|module\.exports)\.?(\w*)\s*=\s*\[/);
const name = m && m[1];
const sandbox = { window: {}, module: { exports: {} }, exports: {}, console };
let list;
try {
  const code = src + (name ? '\n;' + name : '');
  const result = vm.runInNewContext(code, sandbox, { filename: 'products-data.js' });
  list = Array.isArray(result) ? result : Object.values(sandbox.window).find(Array.isArray) || [].concat(sandbox.module.exports.products || []);
} catch (e) {
  const ln = parseInt((String(e.stack).match(/products-data\.js:(\d+)/) || [])[1], 10);
  console.log('\n✗ SYNTAX ERROR: ' + e.message);
  if (ln) {
    const lines = src.split('\n');
    console.log('  Problem is at line ' + ln + '. Check the entry ABOVE it for a missing comma or bracket:\n');
    for (let i = Math.max(0, ln - 8); i < Math.min(lines.length, ln + 3); i++)
      console.log((i + 1 === ln ? ' >> ' : '    ') + String(i + 1).padStart(4) + ' | ' + lines[i]);
  }
  process.exit(1);
}
if (!list || !list.length) { console.log('✗ Syntax is fine but no product list was found.'); process.exit(1); }
console.log('Syntax OK. Found ' + list.length + ' products.\n');

// 2. Per-entry checks
const seen = {};
const exists = f => fs.existsSync(path.join(ROOT, f));
list.forEach((p, i) => {
  const label = (p && p.id) || 'entry #' + (i + 1);
  const b = errors, w = warnings;
  console.log(label);
  REQUIRED.forEach(k => { if (p[k] === undefined || p[k] === '' || (Array.isArray(p[k]) && !p[k].length)) bad('missing "' + k + '"'); });
  if (p.id) { if (seen[p.id]) bad('duplicate id (also entry #' + seen[p.id] + ')'); seen[p.id] = i + 1; }
  if (p.type && !TYPES.includes(p.type)) warn('type "' + p.type + '" is not one of ' + TYPES.join('/'));
  if (p.price !== undefined && typeof p.price !== 'number') bad('price should be a number, not text');
  if (p.status && p.status !== 'active') warn('status is "' + p.status + '", so it may not display');
  const imgs = [].concat(p.images || [], p.image || []);
  [...new Set(imgs)].forEach(f => { if (!exists(f)) bad('image file not found: ' + f); });
  if (p.image && p.images && !p.images.includes(p.image)) warn('"image" is not listed in "images"');
  if (p.id && p.image && !path.basename(p.image).startsWith(p.id)) warn('image name does not match id: ' + p.image);
  if (p.video && !exists(p.video)) bad('video file not found: ' + p.video + (exists(p.video.replace(/^images\//, 'videos/')) ? ' (but it exists in videos/, fix the path)' : ''));
  if (errors === b && warnings === w) console.log('  ✓ ok');
});

console.log('\n' + (errors ? '✗ ' + errors + ' error(s)' : '✓ No errors') + (warnings ? ', ' + warnings + ' warning(s)' : '') + '.');
process.exit(errors ? 1 : 0);
