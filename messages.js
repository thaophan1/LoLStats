const Discord = require('discord.js')
let champs = require('./champions')

function LookUpMessage(info, stats) {
	const summoner = info.summoner
	const rankInfo = info.rankInfo
	const topChampions = stats.champions
	let WR = ((rankInfo.wins / (rankInfo.losses + rankInfo.wins)) * 100).toFixed(
		2
	)
	const embed = new Discord.MessageEmbed()
		.setTitle(`${summoner.name} \tLevel: ${summoner.summonerLevel}`)
		.setColor('RANDOM')
		.addFields(
			{
				name: 'Rank',
				value: `${rankInfo.tier} ${rankInfo.rank} \n${rankInfo.leaguePoints} LP`,
				inline: true,
			},
			{ name: 'Win Rate', value: `${WR}%`, inline: true },
			{
				name: 'KDA',
				value: `${stats.kills}/${stats.deaths}/${stats.assists}`,
				inline: true,
			},
			{ name: 'Primary Role', value: `${stats.primaryRole}`, inline: true },
			{ name: 'Seconday Role', value: `${stats.secondaryRole}`, inline: false },
			{
				name: 'Champion 1',
				value: `${champs.getChampByIDs(stats.champions[0].id)}`,
				inline: true,
			},
			{
				name: 'WR',
				value: `${stats.champions[0].wins.toFixed(2)}%`,
				inline: true,
			},
			{
				name: 'KDA',
				value: `${stats.champions[0].kills.toFixed(
					2
				)}/${stats.champions[0].deaths.toFixed(
					2
				)}/${stats.champions[0].assists.toFixed(2)}`,
				inline: true,
			},
			{
				name: 'Champion 2',
				value: `${champs.getChampByIDs(stats.champions[1].id)}`,
				inline: true,
			},
			{
				name: 'WR',
				value: `${stats.champions[1].wins.toFixed(2)}%`,
				inline: true,
			},
			{
				name: 'KDA',
				value: `${stats.champions[1].kills.toFixed(
					2
				)}/${stats.champions[1].deaths.toFixed(
					2
				)}/${stats.champions[1].assists.toFixed(2)}`,
				inline: true,
			},
			{
				name: 'Champion 3',
				value: `${champs.getChampByIDs(stats.champions[2].id)}`,
				inline: true,
			},
			{
				name: 'WR',
				value: `${stats.champions[2].wins.toFixed(2)}%`,
				inline: true,
			},
			{
				name: 'KDA',
				value: `${stats.champions[2].kills.toFixed(
					2
				)}/${stats.champions[2].deaths.toFixed(
					2
				)}/${stats.champions[2].assists.toFixed(2)}`,
				inline: true,
			}
		)

	return embed
}

module.exports = { LookUpMessage }
