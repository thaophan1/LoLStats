const credentials = require("../credentials.json");
const fetch = require("node-fetch")

let defaultURL = ''

async function LookUp(region, name) {
    if (region === "las") num = 2;
    else if (region != "kr" && region != "ru") num = 1;
    defaultURL = `https://${region}${num == null ? "" : num
        }.api.riotgames.com/lol/`
    const summoner = await getSummoner(defaultURL, name)
    const rankInfo = await getRank(defaultURL, summoner.id)
    const matches = await getMatchHistory(defaultURL, summoner.accountId)

    console.log(summoner)
    console.log(rankInfo)
    console.log(matches)
}

async function getSummoner(defaultURL, name) {
    const URL = defaultURL + `summoner/v4/summoners/by-name/${name}?api_key=${credentials.api_key
        }`;
    
    // response is a single JSON object
    const response = await fetch(URL)
    const json = await response.json()
    
    return json
}

async function getRank(defaultURL, summonerId) {
    const URL = defaultURL + `league/v4/entries/by-summoner/${summonerId}?api_key=${credentials.api_key
        }`;
    
    // response is an array of one JSON object
    const response = await fetch(URL)
    const json = await response.json()
    
    return json[0]
}

async function getMatchHistory(defaultURL, accountId) {
    const URL = defaultURL + `match/v4/matchlists/by-account/${accountId}?api_key=${credentials.api_key
        }`;

    // response is an array of JSON objects
    const response = await fetch(URL)
    const json = await response.json()

    let matchHistory = []
    for (let i = 0; i < json.matches.length; i++) {
        tempJSON = {
            role: json.matches[i].role,
            lane: json.matches[i].lane
        }
        matchHistory.push(tempJSON)
    }

    return matchHistory
}

module.exports = { LookUp };
