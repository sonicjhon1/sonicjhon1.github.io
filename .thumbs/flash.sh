#!/bin/bash

projects=("01 Redirect-UI" "03 Genshin-Redeem-Code-UI" "04 NachoNekoNyaanime-UI" "05 KanoColle-UI" "06 LILIESARK-UI" "07 BelajarBersama-UI" "08 GT-Reminder-UI" "09 SchoolworkList-UI")
IFS=""

for project in ${projects[@]}; do
    projectHTML="${project// /%20}"
    curl "https://api.apiflash.com/v1/urltoimage?access_key=79b0e7c367b84a8387c8041566437096&url=https://sonicj.pages.dev/${projectHTML}&format=webp&response_type=image&width=1280&height=720&quality=90" -o "${project}.webp"
done