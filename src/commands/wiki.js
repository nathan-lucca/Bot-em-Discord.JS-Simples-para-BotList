const Discord = require('discord.js');
module.exports = {
  config: {
    name: "wiki",
    aliases: ['wikar', 'cmd'],
    category: 'Utilidades',
    cooldown: 5,
    description: 'Adicione uma wiki no servidor!',
    usage: `bm!wiki <cmd>`
  },
  run: async (client, message, args) => {
    let canal = message.guild.channels.cache.find((c) => c.name === 'NOME DO CANAL DE WIKIS AQUI')

    let nome = args[0];

    if (!nome) {
      return message.reply('informe o nome do seu comando!')
    }

    let code = args.slice(1).join(" ");

    if (!code) {
      return message.reply(`informe algum código para por na wiki!`)
    }

    message.delete()

    const embed = new Discord.MessageEmbed()
      .setAuthor(`Nova wiki do usuário: ${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTitle(`Comando: ${nome}`)
      .setColor('#148aff')
      .setDescription(`\`\`\`js\n${args.slice(1).join(" ")}\`\`\``)
      .setFooter(`✅ Gostei | ❌ Não gostei`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp();

    canal.send(embed).then(m => {
      m.react('✅');
      m.react('❌')
    })

    message.reply(`**sua wiki foi enviada com sucesso no canal ${canal}!**`)

  }
}