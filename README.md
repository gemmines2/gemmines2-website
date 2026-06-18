# Gemmines2 â€” Google Merchant Center fix

## What was actually wrong (3 separate bugs, stacked)

**1. Your live `feed.xml` is not a feed â€” it's the wrong file.**
I downloaded it and it's literally the HTML source of your `generate-feed.html`
tool page, not a product feed. If Merchant Center is set to auto-fetch
`feed.xml`, it's been failing to parse it as XML at all. This alone could
explain mass disapprovals/account flags independent of anything else below.

**2. Both `feed.xml` and `feed.csv` were stale.**
The 4 newest products (GM-SPN-1010, GM-ZRCN-1013-1, GM-SAP-1016, GM-SPN-1017)
were never in the feed â€” they'd simply never been submitted to Google at all.
`sitemap.xml` was also stale and, separately, every product URL in it was
missing `.html` (e.g. `product?id=...` instead of `product.html?id=...`),
so those sitemap links 404.

**3. The deeper one â€” `product.html?id=...` can't be verified by Google at all.**
Your `?id=` parameter handling and dynamic JSON-LD injection were already
implemented correctly. The problem is that `product.html` is one physical
file, and all the content (title, price, description, JSON-LD) is filled in
by JavaScript *after* the page loads. Per Google's own documentation:
"Googlebot crawls the data present in the HTML returned from your web
server. If data on your website is passed dynamically with JavaScript after
the page is loaded, this will trigger an error." Merchant Center's
verification crawl reads the raw HTML response â€” which for `product.html`
is always the same blank "Loadingâ€¦" shell, regardless of the ID in the URL.
This is the root cause of "Mismatched value (page crawl)" / "Missing
microdata," and a query parameter alone can't fix it on a fully static host
like GitHub Pages â€” a different *file* needs to exist per product.

## What's in this package

- `product/` â€” 34 fully static HTML files, one per product (e.g.
  `product/GM-SPN-1010.html`). Each one already contains the real title,
  price, description, images and a baked-in JSON-LD `<script>` block
  directly in the page source â€” no JavaScript required to see it. Verified:
  no leftover placeholders, valid JSON-LD on every page, no broken relative
  paths.
- `feed.xml` / `feed.csv` â€” regenerated from your current `products-data.js`
  (all 34 products, using the same field rules as your existing
  `generate-merchant-feed.html` tool), now linking to the new static
  `/product/<id>.html` pages instead of `product.html?id=`.
- `sitemap.xml` â€” regenerated, correct `.html` extensions, all 34 current
  products.
- `products-data.js` â€” one data fix: a mangled em-dash in the GM-SPN-1010
  name (encoding glitch) corrected.
- `index.html`, `products.html`, `product.html` â€” one-line link updates so
  every "view product" link site-wide now points at the new static pages.
  `product.html?id=...` itself is untouched and still works, so any old
  bookmarks/shared links keep functioning.
- `build-product-pages.js`, `build-feed.js`, `build-sitemap.js` â€” the
  generator scripts. Run `node build-product-pages.js && node
  build-feed.js && node build-sitemap.js` any time you add/edit a product in
  `products-data.js`, before pushing.
- `.github/workflows/rebuild-products.yml` â€” does that automatically: on
  every push that touches `products-data.js`, GitHub Actions regenerates
  all of the above and commits the result back. You just edit
  `products-data.js` and push; no manual script-running needed.

## Deploy steps

1. Drop all these files into your repo at matching paths (overwrite the
   existing `feed.xml`, `feed.csv`, `sitemap.xml`, `index.html`,
   `products.html`, `product.html`, `products-data.js`; add the new
   `product/` folder and the three `build-*.js` scripts; add the
   `.github/workflows/rebuild-products.yml` file).
2. Commit and push to `main`.
3. In Merchant Center: re-fetch the feed (Products â†’ Feeds â†’ your feed â†’
   "Fetch now"), then request a re-crawl of a few previously-disapproved
   items (Diagnostics â†’ affected items â†’ "Request review" or just wait for
   the next scheduled crawl).
4. Going forward: edit `products-data.js` as usual (add/remove/update
   products), push, and the GitHub Action rebuilds everything else for you.

## One thing to verify yourself

The workflow needs Actions to have write permission to push commits back to
the repo. In your repo: Settings â†’ Actions â†’ General â†’ Workflow permissions
â†’ set to "Read and write permissions." Without that, the auto-commit step
will fail (the page generation itself will still succeed, you'd just need
to merge it manually).
