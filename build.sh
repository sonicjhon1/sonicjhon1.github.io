#!/bin/bash

# Build folders
build01UI() {
    # Install NPM deps
    npm install

    # Build and deploy the page
    npm run build
    cp -R dist/* .
    rm -rfd node_modules
    rm -rfd dist
}
build03UI() {
    cd "03 Genshin-Redeem-Code-UI"
    chmod +x build.sh
    ./build.sh
}
build04UI() {
    cd "04 NachoNekoNyaanime-UI"
    chmod +x build.sh
    ./build.sh
}
build05UI() {
    cd "05 KanoColle-UI"
    chmod +x build.sh
    ./build.sh
}
build09UI() {
    cd "09 SchoolworkList-UI"
    chmod +x build.sh
    ./build.sh
}
build09MDXUI() {
    cd "09 SchoolworkListMDX-UI"
    chmod +x build.sh
    ./build.sh
}

build01UI & build03UI & build04UI & build05UI & build09UI & build09MDXUI
echo "Done!"