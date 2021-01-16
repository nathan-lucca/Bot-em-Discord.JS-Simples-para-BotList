const Discord = require('discord.js');
const botDB = require('../database.js');
module.exports = {
  config: {
    name: "votar",
    aliases: ['vota'],
    category: 'Utilidades',
    cooldown: 86400,
    description: 'Vote em um bot!',
    usage: `bm!votar <bot>`
  },
  run: async (client, message, args) => {
    let bot = message.mentions.members.first()
    if (!bot) return message.channel.send(`${message.author}, você não mencionou um bot!`)

    let botdb = await botDB.findById(bot.id);
    if (!botdb) return message.channel.send(`${message.author}, este bot não está registrado!`);

    botdb.votos += 1;
    botdb.save()

    if (botdb.votos == 30) {
      let canal = client.guilds.cache.get("ID DO SERVIDOR").channels.cache.get("ID DO CANAL DE VOTOS")
      let cargo = message.guild.roles.cache.get('ID DO CARGO DE BOT VENCEDOR')

      let embed = new Discord.MessageEmbed()
        .setTitle(`Parabéns`)
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription(`Algum bot conseguiu a marca de \`30\` votos e ganhou um cargo premium de 1 mês!`)
        .setColor('#148aff')
        .addField(`<:bot:745341570781544548> | Bot:`, `${bot}`)
        .addField(`<:LansoABraba:745343704243503194> | Votos:`, `\`${botdb.votos}\``)
        .addField(`🛡️ | Cargo:`, `${cargo}`)
      bot.roles.add(cargo)
      canal.send('@everyone', embed)
    }

    let canal = client.guilds.cache.get("ID DO SERVIDOR").channels.cache.get("ID DO CANAL DE VOTOS")
    let embed1 = new Discord.MessageEmbed()
      .setTitle(`Você acaba de votar em um bot`)
      .setThumbnail(message.author.displayAvatarURL({
        dynamic: true
      }))
      .setColor('#148aff')
      .addField(`<:bot:745341570781544548> | Bot:`, `${bot}`)
      .addField(`<:LansoABraba:745343704243503194> | Voto:`, `\`+1\``)
    canal.send(`${message.author}`, embed1)

    let channel = client.guilds.cache.get("ID DO SERVIDOR").channels.cache.get("ID DO CANAL DE VOTOS")
    let embed2 = new Discord.MessageEmbed()
      .setDescription(`${message.author}, veja o canal ${channel}!`)
      .setColor('#148aff')
    message.channel.send(embed2)
  }
}