const {
  inspect
} = require('util');
const {
  MessageEmbed
} = require('discord.js');
module.exports = {
  config: {
    name: "eval",
    aliases: ["ev"],
    cooldown: 0,
    description: 'Ajuda na hora de fazer os comandos!',
    category: 'Admin',
    usage: `bm!eval <code>`
  },
  run: async (client, message, args) => {
    if (message.author.id !== client.config.devID) return message.channel.send(`${message.author}, você não pode executar esse comando!`);
    try {
      let input = args.slice(0).join(' ')
      let output = eval(input);

      if (typeof output !== "string") output = inspect(output);

      if (output.size > 1950) output = output.substr(0, 1950);

      let embed = new MessageEmbed()
        .setColor('#148aff')
        .addField(`**Entrada**`, `\`\`\`js\n${input}\n\`\`\``)
        .addField(`**Saida:**`, `\`\`\`js\n${output}\n\`\`\``)
      message.channel.send(embed)
    } catch (error) {
      message.channel.send(`**Error:**\n\`${error}\``);
    }

  }
}