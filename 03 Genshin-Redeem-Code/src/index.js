addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function getCode() {
  // Scrape a website containing redeem codes
  const res = await fetch(`https://web.scraper.workers.dev/?url=https%3A%2F%2Fgame8.co%2Fgames%2FGenshin-Impact%2Farchives%2F304759&selector=tr&scrape=text&pretty=true`, {
    method: "GET",
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
    },
  });

  // Convert to JSON, grab the code that starts with ',"' and end with ' '.
  const data = await res.json();
  const text = JSON.stringify(data);

  const coderegex = [ ...text.matchAll(/,"(.*?)\ /g) ];
  
  const result = 
  [ coderegex[0][1], coderegex[1][1], coderegex[2][1] ]
  return result;
}

async function getReward() {
  // Scrape a website containing redeem codes
  const res = await fetch(`https://web.scraper.workers.dev/?url=https%3A%2F%2Fgame8.co%2Fgames%2FGenshin-Impact%2Farchives%2F304759&selector=tr&scrape=text&pretty=true`, {
    method: "GET",
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
    },
  });

  // Convert to JSON, grab the rewards between ' ' and "
  const data = await res.json();
  const text = JSON.stringify(data);
  const rewardregex = [ ...text.matchAll(/\ (.*?)"/g) ];

  const result = 
  [ rewardregex[1][1], rewardregex[2][1], rewardregex[3][1] ]
  return result;
}

async function handleRequest(request) {
  const redeemCodeArray = await getCode();
  const rewardArray = await getReward();
  const url = `https://genshin.hoyoverse.com/gift?code=`
  var resultCodeArray = [];
  var resultRewardArray = [];
  
  // Only grab as much as redeem code lenght
  for (let i=0; i < (n=redeemCodeArray.length); i++) {
    resultCodeArray.push(url + redeemCodeArray[i]);
    resultRewardArray.push(rewardArray[i]);
  }
  
  // Send the result as JSON
  // const result = JSON.stringify(resultCodeArray);
  const result = {
    "codes": resultCodeArray,
    "rewards": resultRewardArray
  }
  return new Response(JSON.stringify(result), { headers: {
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin":"*"
  }});
}