const Discord = require('discord.js');
const botDB = require('../database.js');
module.exports = {
    config: {
        name: "votos",
        aliases: ['voto'],
        category: 'Utilidades',
        cooldown: 5,
        description: 'Veja quantos votos tem um bot!',
        usage: `bm!votos <bot>`
    },
    run: async (client, message, args) => {
        let bot = message.mentions.members.first()
        if (!bot) return message.channel.send(`${message.author}, você não mencionou um bot!`)

        let botdb = await botDB.findById(bot.id);
        if (!botdb) return message.channel.send(`${message.author}, este bot não está registrado!`);

        let embed = new Discord.MessageEmbed()
            .setTitle(`Votos`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setColor('#148aff')
            .addField(`<:bot:745341570781544548> | Bot:`, `${bot}`)
            .addField(`<:LansoABraba:745343704243503194> | Votos:`, `\`${botdb.votos}\``)
        message.channel.send(embed)
    }
}