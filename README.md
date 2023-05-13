# Sonicjhon1's UI PORTFOLIO
![logo](https://github.com/sonicjhon1/sonicjhon1.github.io/raw/main/.thumbs/SJUI-GFX-1.png)
<sub><sup>Sauce: [MajinAI](https://majinai.art/ja/i/nxpKRpw)</sup></sub>
## 00 - Portofolio-UI (Vanilla HTML)
The first ever website hosted in this Github repository. It was a website containing all of my GFX designs and other stuff.
> *Note: Newer version is in **10 - Portofolio-Astro-UI**.*  
> Bug fixes and updates are not included in this version anymore.

## 01 - Redirect-UI (Vanilla HTML)
This HTML will redirect to a Rickroll on youtube after a few seconds had passed. It uses the ```<meta>``` tag for redirecting and JS to show the countdown. 
![thumb](.thumbs/01%20Redirect-UI.webp)
> *Note: [ApiFlash](https://apiflash.com) only captures the screenshot after the ```<meta>``` redirect has finished, therefor the screenshot shown is the redirected page.*

## 02 - Cloudflare-Static-Proxy (Wrangler)
This is a simple wrangler (Cloudflare worker) script that will proxy all static fetch requests to the cloudflare server and send it back to the user's browser.

## 03 - Genshin-Redeem-Code & UI (Wrangler & Astro, Tailwind)
**- The API** is built using a string scraper that lives inside of a Cloudflare worker. This API scrapes the redeem code from a certain website everytime a request is made.  
**- The UI** is made with Astro and Tailwind, which fetches the redeem code from the API and parse it. The redeem code is then shown in the UI for the user to see. A **redeem** button is also avaliable for the user. The button will redirect the user to the game's redeem code website where the code already filled in. 
![thumb](.thumbs/03%20Genshin-Redeem-Code-UI.webp)
> *Note: It is currently broken because of the new layout from the website I'm scraping from. I won't fix it for the time being, pull requests are welcome!*

## 04 - NachoNekoNyaanime-UI (Astro, Tailwind)
A website built for my friends' project. It lists all the trending and latest anime from Anilist through [Consumet API](https://github.com/consumet/api.consumet.org). It it also just a copy of [AnimeFlix](https://github.com/chirag-droid/animeflix) ported to use Astro.
![thumb](.thumbs/04%20NachoNekoNyaanime-UI.webp)

## 05 - KanoColle-UI (Astro)
A cheap copy of [Beatbump.ml](https://beatbump.ml/home) made with Astro and Vanilla CSS. This website doesn't actually play the musics, it just redirect to the Youtube Music's page.
![thumb](./.thumbs/05%20KanoColle-UI.webp)
> *Note: This project isn't actually finished yet...*

## 06 - LILIESARK-UI (Vanilla HTML)
This is another website built for my friends' school assignment. They got a topic of making a website about a game, which led to this. It was supposed to have something related to [Arknights](https://www.arknights.global), but we scraped that idea as the deadline is already too close. All of this is made with pure vanilla HTML, CSS and Javascript. It features **Saving settings, scene transitions, login screen (with very simple checks), audio (Musics and SFXs), and even fullscreen video playback with audio!**
![thumb](./.thumbs/06%20LILIESARK-UI.webp)
> *Note: The names of companies and products mentioned on this page are the trademarks or registered trademarks of their respective owners. ©BINARY HAZE INTERACTIVE Inc*

## 07 - BelajarBersama-UI (Vanilla HTML)
Another website made for my friends' assignment. This website a website where people could post their learning materials, and share useful informations. This website also include a simple login screen *(a requirement for their assignment)*.
![thumb](./.thumbs/07%20BelajarBersama-UI.webp)

## 08 - GT-Reminder & UI (Wrangler & Astro, Tailwind)
A website I made on my free time as I was bored. The goal was to display the Growtopia game's player count as a notification for **"Ban waves"** (which was not implemented later). Though, this website requires the user to first sign in with their Google account and verify their "License key" (done on the API hosted on Cloudflare). The Auth was done with the help of Auth0. 
After a few weeks, I got bored and decided to abandon this project.
![thumb](./.thumbs/08%20GT-Reminder-UI.webp)
> *Note: This project has been abandoned. Won't be updated until further notice.*

## 09 - SchoolworkList-UI (Astro, Tailwind, DaisyUI)
This is a website similar to [Google Classroom](https://classroom.google.com), but with the added functionality of **freely customizing the looks, themes, and even the ability to set custom Backend URL** when fetching the post's data. It is currently planned to be used by my friends' class. Full list of libraries and integrations used are listed in the website's about page.
![thumb](./.thumbs/09%20SchoolworkList-UI.webp)

## 09 - SchoolworkListMDX-UI (Astro, Tailwind, DaisyUI)
This is the "Backend" that could be used for **09 SchoolworkList-UI**. It generates a static HTML page based on the MDXs inside of the ```src/content``` folder. It will then apply the theme onto the pages dynamically with javascript via the ```?theme=``` parameter passed to it's url. It will also return all of the posts metadata when querying via the ```/query``` url.
> *Note: A production version is supposed to be hosted on a private repo via Cloudflare pages, or on a VPS.*

## 10 - Portofolio-Astro-UI (Astro, Tailwind)
A rebuilt of **01 - Redirect-UI** with Astro and modern technologies! It is still in progress but is stable enough to be deployed as [a live site](https://sonicj.pages.dev/).
