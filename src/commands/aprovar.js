const Discord = require('discord.js');
const botDB = require('../database.js');
module.exports = {
  config: {
    name: "aprovar",
    aliases: ['verificar', 'verifica'],
    category: 'Moderação',
    cooldown: 5,
    description: 'Aprova um bot!',
    usage: `bm!aprovar <bot> <id do dono> <linguagem (js/py/dbd)> <nota se quiser>`
  },
  run: async (client, message, args) => {
    if (!message.member.roles.cache.has('ID DO CARGO PERMITIDO')) return message.reply(`você precisa do cargo de \`</Verificadores/>\` para usar este comando!`)

    let bot = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!bot) return message.reply(`mencione um bot para aprovar!`)
    if (bot === message.member) return message.reply(`você não pode aprovar você mesmo.`)

    let motivo = args.slice(3).join(" ");
    if (!motivo) motivo = "Nota não foi informada!"
    if (!message.member.roles.cache.has('ID DO CARGO PERMITIDO')) return message.reply(`você precisa do cargo de \`</Verificadores/>\` para usar este comando!`)

    let dono = args[1]
    if (!dono) return message.reply(`escreva o id do dono desse bot! Ex: bm!reprovar <bot> <id do dono> <linguagem (js/py/dbd)> <nota se quiser>`)
    if (!message.member.roles.cache.has('ID DO CARGO PERMITIDO')) return message.reply(`você precisa do cargo de \`</Verificadores/>\` para usar este comando!`)

    let linguagem = args[2]
    if (!linguagem) return message.reply(`escreva a linguagem do bot! Ex: bm!aprovar <bot> <id do dono> <linguagem (js/py/dbd)> <nota se quiser>`)
    if (!message.member.roles.cache.has('ID DO CARGO PERMITIDO')) return message.reply(`você precisa do cargo de \`</Verificadores/>\` para usar este comando!`)

    if (linguagem == 'js') {
      bot.roles.add(['CARGO 1', 'CARGO 2'])
    }

    if (linguagem == 'py') {
      bot.roles.add(['CARGO 1', 'CARGO 2'])
    }

    if (linguagem == 'dbd') {
      bot.roles.add(['CARGO 1', 'CARGO 2'])
    }

    let canal = message.guild.channels.cache.get('CANAL QUE VAI ENVIAR O canal.send')
    let canal2 = message.guild.channels.cache.get('CANAL QUE VAI ENVIAR O canal2.send')

    await new botDB({
      _id: bot.id
    }).save()

    let embed = new Discord.MessageEmbed()
      .setTitle(`Aprovado!`)
      .setColor('#148aff')
      .setDescription(`**<:bot:745341570781544548> | Bot:** ${bot}\n**👑 | Dono(a):** <@${dono}>\n**<a:martelo:745344197539659816> | Staff:** ${message.author}\n**📰 | Nota:** ${motivo}`)
      .setThumbnail('https://media.discordapp.net/attachments/744657634426355803/744720508607529020/721074574480900146.png')
    canal.send(`<@${dono}>`, embed)
    canal2.send(`O bot acima foi aprovado por ${message.author}`)
  }
}