async function parseJwt(str) {
	if (str == null && str == undefined) {
		return false;
	}
	if (str.startsWith("eyJ")) {
		return true;
	}
}

const header = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "*"
};

addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	if (request.method !== "GET") {
		return new Response(null, {
			headers: header,
			status: 200
		});
	}

	const url = new URL(request.url);
	const path = url.pathname;
	if (request.method == "GET") {
		if (path !== "/verify") {
			const jwt = request.headers.get("Authorization");
			const result = await parseJwt(jwt);
			try {
				if (!result) {
					return new Response("false", {
						headers: header,
						status: 404
					});
				} else {
					return new Response("true", {
						headers: header,
						status: 200
					});
				}
			} catch (error) {
				return new Response("error", {
					headers: header,
					status: 404
				});
			}
		}

		if (path === "/verify") {
			const jwt = request.headers.get("Authorization");
			const result = await parseJwt(jwt);
			
			if (!result) {
				return new Response(null, {
					headers: header,
					status: 200
				});
			}

			const data = '{"1": ' + request.headers.get("data") + '}';
			jsonData = JSON.parse(data)['1'];
			authToken = jsonData[0];
			userInfoJSON = jsonData[1]
			userLicenseKey = jsonData[2]
			dateString = jsonData[3]

			if (jwt !== authToken) {
				return new Response(null, {
					headers: header,
					status: 200
				});
			}
			
			response = data;

			return new Response(response, {
				headers: header,
				status: 200
			});
		}
	}

	return new Response(null, {
		headers: header,
		status: 200
	});
}
