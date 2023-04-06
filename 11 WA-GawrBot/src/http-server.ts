const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const port = 9000;

export function httpServer(file: string) {
	http.createServer(function (req, res) {
		console.log(`${req.method} ${req.url}`);

		// parse URL
		const parsedUrl = url.parse(file);
		// extract URL path
		let pathname = parsedUrl.pathname;
		// based on the URL path, extract the file extension
		const ext = path.parse(pathname).ext;

		fs.exists(pathname, function (exist) {
			if (!exist) {
				// if the file is not found, return 404
				res.statusCode = 404;
				res.end(`File ${pathname} not found!`);
				return;
			}

			// if is a directory search for index file matching the extension
			if (fs.statSync(pathname).isDirectory()) pathname += "/index" + ext;

			// read file from file system
			fs.readFile(pathname, function (err, data) {
				if (err) {
					res.statusCode = 500;
					res.end(`Error getting the file: ${err}.`);
				} else {
					// if the file is found, set Content-type and send data
					res.setHeader("Content-type", "application/json");
					res.end(data);
				}
			});
		});
	}).listen(port);
	
	console.log(`Server listening on port ${port}`);
}
