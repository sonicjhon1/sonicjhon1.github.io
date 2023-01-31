#!/bin/bash

# Install NPM deps
npm install

# Build and deploy the page
npm run build
cp -R dist/* .
rm -rfd node_modules
rm -rfd dist

# Build subfolders
cd "03 Genshin-Redeem-Code-UI" && chmod +x build.sh && ./build.sh && \
cd "../04 NachoNekoNyaanime-UI" && chmod +x build.sh && ./build.sh && \
cd "../05 KanoColle-UI" && chmod +x build.sh && ./build.sh
cd "../09 SchoolworkListMDX-UI" && chmod +x build.sh && ./build.sh