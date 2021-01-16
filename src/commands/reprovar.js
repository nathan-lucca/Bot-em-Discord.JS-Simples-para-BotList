const Discord = require('discord.js');
module.exports = {
  config: {
    name: "reprovar",
    aliases: ['desaprovar', 'reprovou'],
    category: 'Moderação',
    cooldown: 5,
    description: 'Reprova um bot!',
    usage: `bm!reprovar <bot> <id do dono> <motivo>`
  },
  run: async (client, message, args) => {
    if (!message.member.roles.cache.has('ID DO CARGO PERMITIDO')) return message.reply(`você precisa do cargo de \`</Verificadores/>\` para usar este comando!`)

    let bot = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!bot) return message.reply(`mencione um bot para reprovar!`)
    if (bot === message.member) return message.reply(`você não pode reprovar você mesmo.`)

    let motivo = args.slice(2).join(" ");
    if (!motivo) return message.reply(`escreva o motivo! Ex: bm!reprovar <bot> <id do dono> <motivo>`)
    if (!message.member.roles.cache.has('ID DO CARGO PERMITIDO')) return message.reply(`você precisa do cargo de \`</Verificadores/>\` para usar este comando!`)

    let dono = args[1]
    if (!dono) return message.reply(`escreva o id do dono desse bot! Ex: bm!reprovar <bot> <id do dono> <motivo>`)
    if (!message.member.roles.cache.has('ID DO CARGO PERMITIDO')) return message.reply(`você precisa do cargo de \`</Verificadores/>\` para usar este comando!`)

    let canal = message.guild.channels.cache.get('CANAL QUE VAI ENVIAR O canal.send')
    let canal2 = message.guild.channels.cache.get('CANAL QUE VAI ENVIAR O canal2.send')

    let embed = new Discord.MessageEmbed()
      .setTitle(`Reprovado!`)
      .setColor('#148aff')
      .setDescription(`**<:bot:745341570781544548> | Bot:** ${bot}\n**👑 | Dono(a):** <@${dono}>\n**<a:martelo:745344197539659816> | Staff:** ${message.author}\n**📰 | Motivo:** ${motivo}`)
      .setThumbnail('https://media.discordapp.net/attachments/744657634426355803/744720539867676712/721162760456503356.png')
    canal.send(`<@${dono}>`, embed)
    canal2.send(`O bot acima foi reprovado por ${message.author}`)
    bot.kick()
  }
}