#!/bin/bash
# Setup NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# Setup NodeJS
nvm install node
nvm use node

# Install NPM deps
npm install

# Build and deploy the page
npm run build
mv dist/* .
rmdir dist