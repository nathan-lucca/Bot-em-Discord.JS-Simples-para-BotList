const Discord = require('discord.js');
module.exports = {
  config: {
    name: "ping",
    aliases: ['pingar', 'pong'],
    category: 'Utilidades',
    cooldown: 5,
    description: 'Mostra o ping/api do bot!',
    usage: `bm!ping`
  },
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setColor('#148aff')
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle(`Ping | Pong`)
      .addField(`Ping da API:`, `\`${client.ws.ping}\``)
      .addField(`Ping do bot:`, `\`${message.createdTimestamp - Date.now()}\``)
      .setFooter(`${client.user.username} | Todos os direitos reservados.`, client.user.displayAvatarURL())
    message.channel.send(embed)
  }
}