import workbox from "workbox-build";

workbox.generateSW({
	cacheId: "SWL",
	globDirectory: "./",
	globIgnores: ["**/sw-generator.js", "**/swl-service-worker.js", "**node_modules/**/*", "**/dist/**/*"],
	swDest: "public/swl-service-worker.js",
	runtimeCaching: [
		{
			urlPattern: /(?:(?:html|settings|about|index)|\/$)/,
			handler: "NetworkFirst",
			options: {
				cacheName: "swlmarkup",
				expiration: {
					maxAgeSeconds: 1000,
				},
			},
		},
        {
			urlPattern: /\.(?:css|js|webp|png|jpg|ico|svg)$/,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "swlassets",
				expiration: {
					maxAgeSeconds: 1000,
				}
			},
		},
	],
}).then(({count, size}) => {
    console.log(`Generated service worker, which will precache ${count} files, totaling ${size} bytes.`);
}).catch(console.error);
