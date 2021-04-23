const credentials = require("../credentials.json");
const fetch = require("node-fetch")

async function LookUp(region, name) {
    let summoner = await getSummoner(region, name)
    let rankInfo = await getRank(region, summoner.id)
}

async function getSummoner(region, name) {
    let summonerInfo = null
    let num = null;
    if (region === "las") num = 2;
    else if (region != "kr" && region != "ru") num = 1;
    const URL = `https://${region}${num == null ? "" : num
        }.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${credentials.api_key
        }`;
    
    // response is a single JSON object
    const response = await fetch(URL)
    const json = await response.json()
    summonerInfo = json
    
    return summonerInfo
}

async function getRank(region, summonerId) {
    let summoner = null
    let num = null;
    if (region === "las") num = 2;
    else if (region != "kr" && region != "ru") num = 1;
    const URL = `https://${region}${num == null ? "" : num
        }.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${credentials.api_key
        }`;
    
    // response is an array of one JSON object
    const response = await fetch(URL)
    const json = await response.json()
    summoner = json[0]
    
    return summoner
}

module.exports = { LookUp };
