name: Build featured products
on:
  workflow_dispatch:
  push:
    paths:
      - products-data.js
permissions:
  contents: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node build-featured.js
      - run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add index.html
          git diff --staged --quiet || (git commit -m "Auto-rebuild featured products [skip ci]" && git pull --rebase && git push)
