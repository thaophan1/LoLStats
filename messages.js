const Discord = require('discord.js')
let champs = require('./champions')

function LookUpMessage(region, info, stats) {
	if (stats == null) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`${summoner.name} \tLevel: ${summoner.summonerLevel}`)
			.setColor('RANDOM')
			.setDescription('Player has no matches played')
	}

	const summoner = info.summoner
	const rankInfo = info.rankInfo
	const topChampions = stats.champions
	let ranked = true
	if (rankInfo == undefined) ranked = false

	const embed = new Discord.MessageEmbed()
		.setTitle(`${summoner.name} \tLevel: ${summoner.summonerLevel}`)
		.setColor('RANDOM')
		.setURL(`https://${region}.op.gg/summoner/userName=${summoner.name}`)
		.addFields(
			{
				name: 'Rank',
				value: `${
					ranked
						? `${rankInfo.tier} ${rankInfo.rank} \n${rankInfo.leaguePoints} LP`
						: 'Unranked'
				}`,
				inline: true,
			},
			{
				name: 'Win Rate',
				value: `${
					ranked
						? `${(
								(rankInfo.wins / (rankInfo.losses + rankInfo.wins)) *
								100
						  ).toFixed(2)}%`
						: 'No Ranked Games'
				}`,
				inline: true,
			},
			{
				name: 'KDA',
				value: `${stats.kills}/${stats.deaths}/${stats.assists}`,
				inline: true,
			},
			{ name: 'Primary Role', value: `${stats.primaryRole}`, inline: true },
			{ name: 'Seconday Role', value: `${stats.secondaryRole}`, inline: false },
			{
				name: 'Champion 1',
				value: `${
					topChampions[0].id > 0
						? `${champs.getChampByIDs(topChampions[0].id)}`
						: 'N/A'
				}`,
				inline: true,
			},
			{
				name: 'WR',
				value: `${
					topChampions[0].id > 0 ? `${topChampions[0].wins.toFixed(2)}%` : 'N/A'
				}`,
				inline: true,
			},
			{
				name: 'KDA',
				value: `${
					topChampions[0].id > 0
						? `${topChampions[0].kills.toFixed(
								2
						  )}/${topChampions[0].deaths.toFixed(
								2
						  )}/${topChampions[0].assists.toFixed(2)}`
						: 'N/A'
				}`,
				inline: true,
			},
			{
				name: 'Champion 2',
				value: `${
					topChampions[1].id > 0
						? `${champs.getChampByIDs(topChampions[1].id)}`
						: 'N/A'
				}`,
				inline: true,
			},
			{
				name: 'WR',
				value: `${
					topChampions[1].id > 0 ? `${topChampions[1].wins.toFixed(2)}%` : 'N/A'
				}`,
				inline: true,
			},
			{
				name: 'KDA',
				value: `${
					topChampions[1].id > 0
						? `${topChampions[1].kills.toFixed(
								2
						  )}/${topChampions[1].deaths.toFixed(
								2
						  )}/${topChampions[1].assists.toFixed(2)}`
						: 'N/A'
				}`,
				inline: true,
			},
			{
				name: 'Champion 2',
				value: `${
					topChampions[2].id > 0
						? `${champs.getChampByIDs(topChampions[2].id)}`
						: 'N/A'
				}`,
				inline: true,
			},
			{
				name: 'WR',
				value: `${
					topChampions[2].id > 0 ? `${topChampions[2].wins.toFixed(2)}%` : 'N/A'
				}`,
				inline: true,
			},
			{
				name: 'KDA',
				value: `${
					topChampions[2].id > 0
						? `${topChampions[2].kills.toFixed(
								2
						  )}/${topChampions[2].deaths.toFixed(
								2
						  )}/${topChampions[2].assists.toFixed(2)}`
						: 'N/A'
				}`,
				inline: true,
			}
		)

	return embed
}

module.exports = { LookUpMessage }
