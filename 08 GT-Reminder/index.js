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
	} else if (path === "/verify") {
		let body = await request.text()
		console.log(body);
		return new Response(body, {
			headers: header,
			status: 200
		});
	}
	
	return new Response(null, {
		headers: header,
		status: 200
	});
}
