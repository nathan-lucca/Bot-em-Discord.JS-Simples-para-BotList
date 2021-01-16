const Discord = require('discord.js');
module.exports = {
  config: {
    name: "anuncio",
    aliases: ['anunciar'],
    category: 'Utilidades',
    cooldown: 5,
    description: 'Anuncia algo importante no servidor!',
    usage: `bm!anuncio`
  },
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('você não pode executar este comando!')

    message.channel.send('Qual o título deste anúncio ?').then(a => {
      let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, { max: 1 })
        .on('collect', c => {
          const titulo = c.content

          message.channel.send('Qual a descrição deste anúncio ?').then(b => {
            let p = message.channel.createMessageCollector(x => x.author.id === message.author.id, { max: 1 })
              .on('collect', c => {
                const descricao = c.content

                message.channel.send('Anúncio efetuado com sucesso no canal: <#744639766951362631>')

                let embed = new Discord.MessageEmbed()
                  .setTitle(`${titulo}`)
                  .setDescription(`>>> ${descricao}`)
                  .setColor('#148aff')
                  .setImage(`https://media.discordapp.net/attachments/744657634426355803/750464319677923328/gif.gif`)
                  .setThumbnail(message.guild.iconURL({ dynamic: true }))
                  .setFooter(`Anúncio efetuado pelo staff: ${message.author.tag}`)
                  .setTimestamp();
                message.guild.channels.cache.get(`ID DO CANAL SE ANÚNCIOS`).send('<@&ID DE UM CARGO>', embed)
              })
          })
        })
    })
  }
}