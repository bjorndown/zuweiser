#!/usr/bin/env
yarn
webpack -p
rm -rf tmp
mkdir tmp
cp -r --parents dist node_modules/xlsx/dist/xlsx.full.min.js tmp
sed 's/\.\.\/\.\.\///' src/gui/index.html > tmp/index.html # yeah
ls tmp
sudo docker build -t zuweiser .