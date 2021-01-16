const Discord = require('discord.js');
const botDB = require('../database.js');

module.exports = {
  config: {
    name: "rank-votos",
    aliases: ['votos-rank'],
    category: 'Utilidades',
    cooldown: 5,
    description: 'Veja o rank de votos do servidor!',
    usage: `bm!rank-votos`
  },
  run: async (client, message, args) => {
    try {
      let botlist = await botDB.find({}, null, {
        sort: {
          votos: -1
        }
      }).limit(10)

      let embed = new Discord.MessageEmbed()
        .setTitle(`Rank - ${message.guild.name}`)
        .setDescription(`Rank dos bots mais votados do servidor!`)
        .setThumbnail(message.guild.iconURL())
        .setColor('#148aff')

      botlist.map((bot) => {
        let botname = client.users.cache.get(bot._id).tag;
        embed.addField(`Bot: ${botname}`, `Votos: ${bot.votos}`)
      })
      message.channel.send(embed)
    } catch (err) {
      console.log(err)
    }
  }
}