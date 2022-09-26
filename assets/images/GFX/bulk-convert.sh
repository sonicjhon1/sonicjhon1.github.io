#!/bin/bash
# Copy this file to any directory containing images & then run this script in bash shell
# Get all png images in the current directory & convert it to webp format
for file in *.png ;
do
    if [ "${file}" = "*.png" ];
    then echo "No png";
    else
        read w h < <(identify -format "%w %h" $file)
        echo $w,$h
        n=$w
        [ $h -lt $n ] && n=$h && cwebp -mt -m 6 -resize 0 $((n/2)) -q 80 "${file}" -o "${file%.png}tmp.webp";
        [ $h -gt $n ] && cwebp -mt -m 6 -resize $((n/2)) 0 -q 80 "${file}" -o "${file%.png}tmp.webp";
        n=$((n/2))
        convert "${file%.png}tmp.webp" -gravity center -extent "${n}x${n}" "${file%.png}.webp";
        rm "${file%.png}tmp.webp";
    fi
done

for file in *.jpg ;
do
    if [ "${file}" = "*.jpg" ];
    then echo "No jpg";
    else
        read w h < <(identify -format "%w %h" $file)
        echo $w,$h
        n=$w
        [ $h -lt $n ] && n=$h && cwebp -mt -m 6 -resize 0 $((n/2)) -q 80 "${file}" -o "${file%.jpg}tmp.webp";
        [ $h -gt $n ] && cwebp -mt -m 6 -resize $((n/2)) 0 -q 80 "${file}" -o "${file%.jpg}tmp.webp";
        n=$((n/2))
        convert "${file%.jpg}tmp.webp" -gravity center -extent "${n}x${n}" "${file%.jpg}.webp";
        rm "${file%.jpg}tmp.webp";
    fi
done