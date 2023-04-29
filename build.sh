#!/bin/bash

# Build commands
prebuild() {
    # Install PNPM deps
    pnpm install
}
build() {
    # Launch build scripts
    chmod +x build.sh
    ./build.sh
}
postBuild() {
    # Copy all the content of "dist" and removes the "dist" and "node_modules" folder
    cp -R dist/** .
    rm -rfd node_modules
    rm -rfd dist
}

# Initiate build process and deploy the page
prebuild
pnpm dlx turbo run build

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
build08UI() {
    cd "08 GT-Reminder-UI"
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
build10UI() {
    cd "10 Portofolio-Astro-UI"
    cp -R dist/** ..
    rm -rfd node_modules
    rm -rfd dist
}

build03UI & build04UI & build05UI & build08UI & build09UI & build09MDXUI & build10UI

rm -rfd ../node_modules
rm -rfd ../**/node_modules