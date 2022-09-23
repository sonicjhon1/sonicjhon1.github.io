#!/bin/bash
# Copy this file to any directory containing images & then run this script in bash shell
# Get all png images in the current directory & convert it to webp format
for file in *.png ;
do
cwebp -q 80 "$file" -o "${file%.png}.webp";
done

for file in *.jpg ;
do
cwebp -q 80 "$file" -o "${file%.jpg}.webp";
done