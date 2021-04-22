const credentials = require("../credentials.json");
const fetch = require("node-fetch")

async function LookUp(region, name) {
    const summoner = await getSummoner(region, name)
}

async function getSummoner(region, name) {
    let summoner = null
    let num = null;
    if (region === "las") num = 2;
    else if (region != "kr" && region != "ru") num = 1;
    URL = `https://${region}${num == null ? "" : num
        }.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${credentials.api_key
        }`;
    const response = await fetch(URL)
    const json = await response.json()
    summoner = json
    
    return summoner
}

module.exports = { LookUp };
