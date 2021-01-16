const Discord = require('discord.js');
module.exports = {
  config: {
    name: "reload",
    aliases: ['carregar', 'recarregar'],
    category: 'Owner',
    cooldown: 5,
    description: 'Reinicia um comando!',
    usage: `bm!reload <comando>`
  },
  run: async (client, message, args) => {
    if (message.author.id != "463421520686088192") return message.channel.send(`${message.author}, apenas o dono do bot pode usar esse comando!`)

    if (!args[0]) return message.channel.send("Forneça um comando para atualizar!")

    let commandName = args[0].toLowerCase()

    try {
      delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
      client.commands.delete(commandName)
      const pull = require(`../commands/${commandName}.js`)
      client.commands.set(commandName, pull)
    } catch (e) {
      console.log(e)
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(`Reiniciado!`)
      .setColor('#148aff')
      .setDescription(`Um comando foi reiniciado!`)
      .addField(`Comando:`, `\`${args[0].toUpperCase()}\``)
      .addField(`Status:`, `\`Atualizado\``)
    message.channel.send(embed)
  }
}