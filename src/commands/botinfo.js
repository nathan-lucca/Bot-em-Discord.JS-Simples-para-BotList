const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');

module.exports = {
  config: {
    name: "botinfo",
    aliases: ['bot-info', 'info-bot'],
    category: 'Informações',
    cooldown: 5,
    description: 'Mostra informações sobre o bot!',
    usage: `bm!botinfo`
  },
  run: async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
      .setColor('#148aff')
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`${message.guild.me.displayName} | BotInfo`, client.user.displayAvatarURL())
      .addField(`⫷ Desenvolvedor ⫸`, `<@463421520686088192> | \`(463421520686088192)\``)
      .addField(`<a:foguinho:750052616322547733> | Data de Criação:`, [
        `<a:alegria:750052696186290284> **| \`${moment(client.user.createdAt).format('l')}\`**`,
        `🆔 **| \`744633570961784894\`**`
      ])
      .addField(`<a:gatinho:745039977909321779> | Estou em:`, [
        `🏜️ **| \`${client.guilds.cache.size}\` servidores**`,
        `👨 **| \`${client.users.cache.size}\` membros!**`
      ])
      .addField(`<a:tutis:750055856858595462> | Outros:`, [
        `<a:cmd:750056365044531282> **| \`${client.commands.size}\` comandos**`
      ])
      .setFooter(`${client.user.username} | Todos os direitos reservados.`, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(embed)
  }
}