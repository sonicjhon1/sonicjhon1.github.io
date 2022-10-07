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
  const coderegex = [ ...text.matchAll("\\[(.*?)\\]") ];

  const result = [ coderegex[0][1], coderegex[1][1], coderegex[2][1] ]
  return result;
}

async function getReward() {
  // Get Redeem Code from a Reddit post
  const res = await fetch(`https://api.reddit.com/api/info/?id=t3_wndcai`, {
    method: "GET",
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
    },
  });

  // Convert to JSON, grab the description and match all text inside of )| and \n|
  const data = await res.json();
  const text = JSON.stringify(data.data.children[0].data.selftext);
  const rewardregex = [ ...text.matchAll("\\)\\|(.*?)\\|\\\\n") ];

  const result = [ rewardregex[0][1], rewardregex[1][1], rewardregex[2][1] ]
  return result;
}

async function handleRequest(request) {
  const redeemCodeArray = await getCode();
  const rewardArray = await getReward();
  const url = `https://genshin.hoyoverse.com/gift?code=`
  var resultCodeArray = [];
  var resultRewardArray = [];
  // Only grab 3, because last element is [Undefined]
  for (let i=0; i < (n=redeemCodeArray.length); i++) {
    resultCodeArray.push(url + redeemCodeArray[i]);
    resultRewardArray.push(rewardArray[i]);
  }
  
  // Send the result as JSON
  //const result = JSON.stringify(resultCodeArray);
  const result = {
    "codes": resultCodeArray,
    "rewards": resultRewardArray
  }
  return new Response(JSON.stringify(result), { headers: {
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin":"*"
  }});
}