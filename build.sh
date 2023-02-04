#!/bin/bash

# Build commands
prebuild() {
    # Install NPM deps
    npm install
}
build() {
    # Launch build scripts
    chmod +x build.sh
    ./build.sh
}
postBuild() {
    # Copy all the content of "dist" and removes the "dist" and "node_modules" folder
    cp -R dist/* .
    rm -rfd node_modules
    rm -rfd dist
}

# Initiate build process and deploy the page
prebuild
npx turbo run build
postBuild

# Build folders 
build03UI() {
    cd "03 Genshin-Redeem-Code-UI"
    postBuild
}
build04UI() {
    cd "04 NachoNekoNyaanime-UI"
    postBuild
}
build05UI() {
    cd "05 KanoColle-UI"
    postBuild
}
build09UI() {
    cd "09 SchoolworkList-UI"
    postBuild
}
build09MDXUI() {
    cd "09 SchoolworkListMDX-UI"
    postBuild
}

build03UI & build04UI & build05UI & build09UI & build09MDXUI