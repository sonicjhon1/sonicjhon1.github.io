addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
});

async function parseJwt(str) {
  if (str == null && str == undefined) {
    return false;
  }
  if (str.startsWith("eyJ")) {
    return true;
  }
}

async function handleRequest(request) {
	const jwt = request.headers.get("Authorization");
	const result = await parseJwt(jwt);

	try {
		if (!result) {
			return new Response("false", {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "*"
				},
				status: 404
			});
		} else {
			return new Response("true", {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "*"
				},
				status: 200
			});
		}
	} catch (error) {
		return new Response("error", {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*"
			},
			status: 404
		});
	}
}
