#!/usr/bin/env sh
yarn
yarn build
rm -rf tmp
mkdir tmp
cp -r --parents dist node_modules/xlsx/dist/xlsx.full.min.js index.html tmp
ls tmp
sudo docker build -t zuweiser .