module.exports = {
  config: {
    name: "help",
    aliases: ['ajuda', 'hlp'],
    category: 'Utilidades',
    cooldown: 10,
    description: 'Mostra todos os comandos do bot!',
    usage: `bm!help <comando>`
  },
  run: async (client, message, args) => {
    const prefix = client.config.prefix
    const fs = require("fs");
    const Discord = require('discord.js');

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.me.displayName} | Menu de Ajuda`, message.guild.iconURL())
      .setTimestamp()
      .setColor('#148aff')
      .setThumbnail(client.user.avatarURL());

    if (!args[0]) {
      const categories = fs.readdirSync("./src/commands/")

      embed.setTitle(`Meus comandos se encontram aqui!`)
      embed.setDescription(`🔧 | Meu prefix é ${prefix}`);
      embed.addField(`💡 | Utilize da seguinte forma: \`${prefix}help <comando>\``, [
        `\`addbot\``,
        `\`anuncio\``,
        `\`aprovar\``,
        `\`botinfo\``,
        `\`eval\``,
        `\`help\``,
        `\`ping\``,
        `\`rank-votos\``,
        `\`reprovar\``,
        `\`votar\``,
        `\`votos\``,
        `\`wiki\``,
      ], true)
      embed.setFooter(`💯 | Eu tenho um total de ${client.commands.size} comandos!`)
      embed.setThumbnail(client.user.displayAvatarURL())

      categories.forEach(category => {
        const dir = client.commands.filter(c => c.config.category === category);
        const capitalize = category.slice(0, 1).toUpperCase() + category.slice(1);

        try {
          embed.addField(`${capitalize} [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(" | "))
        } catch (e) {

        };
      })
      await message.channel.send(embed);
    } else {
      let command = client.commands.get(client.aliases.get(args[0].toLowerCase())) || client.commands.get(args[0].toLowerCase());
      if (!command) return embed.setTitle(`Comando Inválido!`).setDescription(`Use ${prefix}help para a lista de comandos!`);
      else {
        command = command.config;
        embed.setDescription(`O meu prefixo é \`${prefix}\``);
        embed.setThumbnail(client.user.displayAvatarURL())
        embed.setTitle(`👑 | Comando: ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`);
        embed.addField(`👓 | Descrição:`, command.description ? command.description : "Nenhuma descrição encontrada");
        embed.addField(`🔰 | Cooldown`, `\`${command.cooldown} Segundos\``)
        embed.addField(`🏆 | Aliases`, `\`${command.aliases ? command.aliases.join(" | ") : "Sem Aliases"}\``)
        embed.addField(`🎮 | Categorias`, `\`${command.category}\``)
        embed.addField(`✊ | Modo de uso`, `\`${command.usage}\``)
      }
      await message.channel.send(embed);
    }
  }
}