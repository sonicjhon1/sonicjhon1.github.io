#!/bin/bash

projects=("01%20Redirect-UI" "03%20Genshin-Redeem-Code-UI" "04%20NachoNekoNyaanime-UI" "05%20KanoColle-UI" "06%20LILIESARK-UI" "07%20BelajarBersama-UI" "08%20GT-Reminder-UI" "09%20SchoolworkList-UI")
IFS=""

for project in ${projects[@]}; do
    curl "https://api.apiflash.com/v1/urltoimage?access_key=79b0e7c367b84a8387c8041566437096&url=https://sonicj.pages.dev/${project}&format=webp&response_type=image&width=1280&height=720&quality=90" -o "${project}.webp"
done