addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function getCode() {
  // Get Redeem Code from a Reddit post
  const res = await fetch(`https://api.reddit.com/api/info/?id=t3_wndcai`, {
    method: "GET",
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
    },
  });
  // Convert to JSON, grab the description and match all text inside of []
  const data = await res.json();
  const text = JSON.stringify(data.data.children[0].data.selftext);
  const regex = [ ...text.matchAll("\\[(.*?)\\]") ];

  const result = [ regex[0][1], regex[1][1], regex[2][1] ]
  return result;
}

async function handleRequest(request) {
  const redeemCodeArray = await getCode();
  const url = `https://genshin.hoyoverse.com/gift?code=`
  var resultArray = [];
  // Only grab 3, because last element is [Undefined]
  for (let i=0; i < (n=redeemCodeArray.length); i++) {
    let finalUrl = url + redeemCodeArray[i]
    resultArray.push(finalUrl);
  }
  
  // Send the result as JSON
  const result = JSON.stringify(resultArray);
  return new Response(result, { headers: {"Content-Type":"application/json"}});
}