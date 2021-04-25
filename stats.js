function getPlayerStats(matchHistory) {
    let result = {
        kills: 0.0,
        deaths: 0.0,
        assists: 0.0,
        primaryRole: "",
        secondaryRole: "",
        champions: [
            {
                id: 0,
                wins: 0.0,
                games: 0,
                kills: 0,
                deaths: 0,
                assists: 0
            },
            {
                id: 0,
                wins: 0.0,
                games: 0,
                kills: 0,
                deaths: 0,
                assists: 0
            },
            {
                id: 0,
                wins: 0.0,
                games: 0,
                kills: 0,
                deaths: 0,
                assists: 0
            }
        ]
    }

    let roles = [0, 0, 0, 0, 0]
    let championsMap = new Map()

    for (let i = 0; i < matchHistory.length; i++) {
        const match = matchHistory[i]

        // Calculating KDA
        result.kills += match.kills
        result.deaths += match.deaths
        result.assists += match.assists
        
        // Adding champion to Map
        if (championsMap.has(match.champion)) {
            let value = championsMap.get(match.champion) + 1
            championsMap.set(match.champion, value)
        } else {
            championsMap.set(match.champion, 1)
        }

        // Calculating roles
        switch (match.lane) {
            case "TOP":
                roles[0]++
                break
            case "JUNGLE":
                roels[1]++
                break
            case "MID":
            case "MIDDLE":
                roles[2]++
                break
            case "BOT":
            case "BOTTOM":
                switch(match.role) {
                    case "DUO_CARRY":
                        roles[3]++
                        break
                    case "DUO_SUPPORT":
                        roles[4]++
                        break
                    default:
                        break
                }
            default:
                break
        }
    }

    // Getting primary and secondary roles
    const primary = Math.max(...roles)
    const primaryPos = roles.findIndex(element => element === primary)
    roles[primaryPos] = 0
    const secondary = Math.max(...roles)
    const secondaryPos = roles.findIndex(element => element === secondary)
    console.log(secondaryPos)

    switch(primaryPos) {
        case 0:
            result.primaryRole = "TOP"
            break
        case 1:
            result.primaryRole = "JUNGLE"
            break
        case 2:
            result.primaryRole = "MID"
            break
        case 3:
            result.primaryRole = "ADC"
            break
        case 4:
            result.primaryRole = "SUPPORT"
            break
    }

    switch(secondaryPos) {
        case 0:
            result.secondaryRole = "TOP"
            break
        case 1:
            result.secondaryRole = "JUNGLE"
            break
        case 2:
            result.secondaryRole = "MID"
            break
        case 3:
            result.secondaryRole = "ADC"
            break
        case 4:
            result.secondaryRole = "SUPPORT"
            break
    }

    // Caculating overall KDA
    result.kills = result.kills/matchHistory.length
    result.deaths = result.deaths/matchHistory.length
    result.assists = result.assists/matchHistory.length

    // Calculating top 3 most played champions
    for (let [key, value] of championsMap) {
        if (value > result.champions[0].games) {
            result.champions[2].games = result.champions[1].games
            result.champions[1].games = result.champions[0].games
            result.champions[0].games = value
            result.champions[2].id = result.champions[1].id
            result.champions[1].id = result.champions[0].id
            result.champions[0].id = key
        } else if (value > result.champions[1].games) {
            result.champions[2].games = result.champions[1].games
            result.champions[1].games = value
            result.champions[2].id = result.champions[1].id
            result.champions[1].id = key
        } else if (value > result.champions[2].games) {
            result.champions[2].games = value
            result.champions[2].id = key
        }
    }

    // Calculating most played champions' KDA and WR
    for (let i = 0; i < matchHistory.length; i++) {
        const match = matchHistory[i]
        for (let champion of result.champions)
            if (match.champion === champion.id) {
                champion.wins += 1
                champion.kills += match.kills
                champion.deaths += match.deaths
                champion.assists += match.assists
            }
    }

    for (let champion of result.champions) {
        champion.wins = champion.wins / champion.games * 100
        champion.kills /= champion.games
        champion.deaths /= champion.games
        champion.assists /= champion.games
    }

    console.log(championsMap)
    console.log(result)
}

module.exports = { getPlayerStats }