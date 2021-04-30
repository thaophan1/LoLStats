const Discord = require('discord.js')
let champs = require('./champions')

function LookUpMessage(region, info, stats) {
	const summoner = info.summoner
	const rankInfo = info.rankInfo

	if (stats == null) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`${summoner.name} \tLevel: ${summoner.summonerLevel}`)
			.setColor('DARK_GREEN')
			.setDescription('Player has no matches played')

		return embed
	}

	const topChampions = stats.champions
	let ranked = false
	let WR = 0
	if (rankInfo != undefined) {
		ranked = true
		WR = ((rankInfo.wins / (rankInfo.losses + rankInfo.wins)) * 100).toFixed(2)
	}

	const embed = new Discord.MessageEmbed()
		.setTitle(`${summoner.name} \tLevel: ${summoner.summonerLevel}`)
		.setColor('DARK_GREEN')
		.attachFiles([`./img/profileicon/${summoner.profileIconId}.png`])
		.setThumbnail(`attachment://${summoner.profileIconId}.png`)
		.setURL(
			`https://${region}.op.gg/summoner/userName=${encodeURI(summoner.name)}`
		)
		.addFields(
			{
				name: 'Rank Info:',
				value: `${
					ranked
						? `**${rankInfo.tier} ${rankInfo.rank}**
						**${rankInfo.leaguePoints}** LP/ ${rankInfo.wins}W ${rankInfo.losses}L 
						**Win Rate:** ${WR}% 
						**KDA:** ${stats.kills}/${stats.deaths}/${stats.assists}
						`
						: 'Unranked'
				}`,
				inline: true,
			},
			{
				name: '\u200B',
				value: '\u200B',
				inline: true,
			},
			{
				name: 'Roles:',
				value: `*Primary Role:* 
				**${stats.primaryRole}**
				*Secondary Role:* 
				**${stats.secondaryRole}**
				`,
				inline: true,
			},
			{
				name: '\u200B',
				value: '***Top Champions Recently:***',
				inline: false,
			},
			{
				name: `${
					topChampions[0].id > 0
						? champs.getChampByIDs(topChampions[0].id)
						: '\u200B'
				}`,
				value: `${
					topChampions[0].id > 0
						? `${topChampions[0].games}G ${topChampions[0].wins}W ${
								topChampions[0].losses
						  }L
						**Win Rate:** ${((topChampions[0].wins / topChampions[0].games) * 100).toFixed(
							0
						)}%
						**KDA:** ${topChampions[0].kills.toFixed(2)}/${topChampions[0].deaths.toFixed(
								2
						  )}/${topChampions[0].assists.toFixed(2)}
						[*Blitz*](https://champion.gg/champion/${champs
							.getChampByIDs(topChampions[0].id)
							.split(/\W+/)
							.join('')})`
						: '\u200B'
				}`,
				inline: true,
			},
			{
				name: `${
					topChampions[1].id > 0
						? champs.getChampByIDs(topChampions[1].id)
						: '\u200B'
				}`,
				value: `${
					topChampions[1].id > 0
						? `${topChampions[1].games}G ${topChampions[1].wins}W ${
								topChampions[1].losses
						  }L
						**Win Rate:** ${((topChampions[1].wins / topChampions[1].games) * 100).toFixed(
							0
						)}%
						**KDA:** ${topChampions[1].kills.toFixed(2)}/${topChampions[1].deaths.toFixed(
								2
						  )}/${topChampions[1].assists.toFixed(2)}
						[*Blitz*](https://champion.gg/champion/${champs
							.getChampByIDs(topChampions[1].id)
							.split(/\W+/)
							.join('')})`
						: '\u200B'
				}`,
				inline: true,
			},
			{
				name: `${
					topChampions[2].id > 0
						? champs.getChampByIDs(topChampions[2].id)
						: '\u200B'
				}`,
				value: `${
					topChampions[2].id > 0
						? `${topChampions[2].games}G ${topChampions[2].wins}W ${
								topChampions[2].losses
						  }L
						**Win Rate:** ${((topChampions[2].wins / topChampions[2].games) * 100).toFixed(
							0
						)}%
						**KDA:** ${topChampions[2].kills.toFixed(2)}/${topChampions[2].deaths.toFixed(
								2
						  )}/${topChampions[2].assists.toFixed(2)}
						[*Blitz*](https://champion.gg/champion/${champs
							.getChampByIDs(topChampions[2].id)
							.split(/\W+/)
							.join('')})`
						: '\u200B'
				}`,
				inline: true,
			}
		)

	return embed
}

module.exports = { LookUpMessage }
