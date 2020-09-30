#!/bin/sh
npm run lint
npm run test
npm run doc
cp docs/index.html docs/404.html
cp src/.well-known/assetlinks.json docs/.well-known
