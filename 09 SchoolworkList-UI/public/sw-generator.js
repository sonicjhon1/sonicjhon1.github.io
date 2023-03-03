import workbox from "workbox-build";

workbox.generateSW({
	cacheId: "SWL",
	globDirectory: "./",
	globPatterns: ["**/*.{css, js, webp, png, jpg}"],
	globIgnores: ["**/ServiceWorker.*", "**/swl-service-worker.js", "**node_modules/**/*"],
	swDest: "public/swl-service-worker.js",
	runtimeCaching: [
		{
			urlPattern: /\.(?:html|htm|xml)$/,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "swlmarkup",
				expiration: {
					maxAgeSeconds: 1000,
				},
                precacheFallback: {
                    fallbackURL: './index.html',
                }
			},
		},
	],
}).then(({count, size}) => {
    console.log(`Generated service worker, which will precache ${count} files, totaling ${size} bytes.`);
}).catch(console.error);
