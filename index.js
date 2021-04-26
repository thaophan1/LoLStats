const Discord = require('discord.js')
const credentials = require('./credentials.json')
const LookUp = require('./commands/Lookup')
const regions = require('./regions.json')
const champions = require('./champions')
const stats = require('./stats')
const messages = require('./messages')

const client = new Discord.Client()
const prefix = '-'

client.once('ready', () => {
	console.log('Scuttle is online!')
})

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return

	const args = message.content.slice(prefix.length).split(' ')
	const command = args.shift().toLowerCase()

	if (command === 'l' || command === 'lookup') {
		if (args.length == 0) {
			message.channel.send("-l <region> <summoner's name>")
			return
		}
		const region = args.shift().toLowerCase()
		if (!regions.includes(region)) {
			message.channel.send(`${region} is not a valid region`)
			return
		}

		const getPlayerInfo = async () => {
			let playerInfo = await LookUp.LookUp(region, args.join(' '))
			if (playerInfo == null) return
			console.log(playerInfo)
			playerStats = stats.getPlayerStats(playerInfo.matchHistory)
			console.log(playerStats)
			const embed = messages.LookUpMessage(playerInfo, playerStats)
			message.channel.send(embed)
		}

		getPlayerInfo()
	}
})

client.login(credentials.bot_token)
