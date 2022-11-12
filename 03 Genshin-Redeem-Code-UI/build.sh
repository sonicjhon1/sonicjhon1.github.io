#!/bin/bash
npm install
npm run build
mv dist/* .
rmdir dist