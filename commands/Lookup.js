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

    let matchHistory = []
    for (let i = 0; i < matches.length; i++) {
        matchHistory.push(await getMatchInfo(defaultURL, matches[i].gameId, name))
    }
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
            gameId: json.matches[i].gameId,
        }
        if (json.matches[i].queue >= 400 && json.matches[i].queue <= 440)
            matchHistory.push(tempJSON)
        if (matchHistory.length > 19)
            break
    }

    return matchHistory
}

async function getMatchInfo(defaultURL, matchId, name) {
    const URL = defaultURL + `match/v4/matches/${matchId}?api_key=${credentials.api_key
    }`;

    // response is a JSON object
    const response = await fetch(URL)
    const json = await response.json()

    let participantId = null
    let player = null
    let playerStats = {
        champion: 0,
        win: null,
        role: "",
        lane: "",
        kills: 0,
        deaths: 0,
        assists: 0
    }

    // if (json.gameType != "MATCHED_GAME") return null

    for (let i = 0; i < json.participantIdentities.length; i++) {
        const participant = json.participantIdentities[i]
        if (participant.player.summonerName.toLowerCase() === name) {
            participantId = participant.participantId - 1
            break
        }
    }

    player = json.participants[participantId]
    playerStats.champion = player.championId
    playerStats.win = player.stats.win
    playerStats.role = player.timeline.role
    playerStats.lane = player.timeline.lane
    playerStats.kills = player.stats.kills
    playerStats.deaths = player.stats.deaths
    playerStats.assists = player.stats.assists

    return playerStats
}

module.exports = { LookUp };
