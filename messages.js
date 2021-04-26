const Discord = require("discord.js");

function LookUpMessage(info, stats) {
  const summoner = info.summoner;
  const rankInfo = info.rankInfo;
  const topChampions = stats.champions;
  let WR = ((rankInfo.wins / (rankInfo.losses + rankInfo.wins)) * 100).toFixed(
    2
  );
  const embed = new Discord.MessageEmbed()
    .setTitle(`${summoner.name} \tLevel: ${summoner.summonerLevel}`)
    .setColor("RANDOM")
    .addFields(
      {
        name: "Rank",
        value: `${rankInfo.tier} ${rankInfo.rank} \n${rankInfo.leaguePoints} LP`,
        inline: true,
      },
      { name: "Win Rate", value: `${WR}%`, inline: true },
      {
        name: "KDA",
        value: `${stats.kills}/${stats.deaths}/${stats.assists}`,
        inline: true,
      },
      { name: "Primary Role", value: `${stats.primaryRole}`, inline: true },
      { name: "Seconday Role", value: `${stats.secondaryRole}`, inline: true }
    );

  return embed;
}

module.exports = { LookUpMessage };
