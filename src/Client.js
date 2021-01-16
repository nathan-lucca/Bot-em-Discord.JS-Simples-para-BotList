const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const {
  Client,
  Collection,
  DiscordAPIError,
  MessageEmbed
} = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");
const config = require("../config.json");
const moment = require('moment');
const botDB = require('./database.js');
moment.locale('pt-br');

module.exports = class extends Client {
  constructor(options = {}) {
    super(options);
    this.config = config;
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.on('ready', () => {
      console.log(`[${chalk.magenta("BOT")}] Estou online em ${this.guilds.cache.size} servidores com ${this.users.cache.size} usuários!`);
      let activities = [{
          name: `${this.guilds.cache.size} servidores.`,
          type: 'PLAYING'
        },
        {
          name: `${this.users.cache.size} usuários.`,
          type: 'PLAYING'
        },
        {
          name: `${this.commands.size} comandos.`,
          type: 'PLAYING'
        }
      ];
      let index = 0;
      setInterval(async () => {
        let activitie = activities[index];
        index++;
        if (!activitie) {
          activitie = activities[0];
          index = 0
        }
        this.user.setPresence({
          activity: {
            name: activitie.name,
            type: activitie.type
          }
        });
      }, 3000);
    });

    this.on('guildMemberAdd', async (member) => {
      let bot = member.user.bot
      if (!bot) return;

      let canal = member.guild.channels.cache.find(e => e.id === "ID DO CANAL DE BEM VINDO")

      let embed = new MessageEmbed()
        .setColor('#148aff')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`👑 __Boas-Vindas__ 👑`)
        .setDescription(`Seja muito bem-vindo ${member.user} ao servidor ${member.guild.name}! Você é o nosso ${member.guild.memberCount}º membro!`)
        .setThumbnail(member.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 1024
        }))
        .setFooter('ID do usuário: ' + member.user.id)
        .setTimestamp();
      canal.send(embed)
    });

    this.on('guildMemberRemove', async (member) => {

      if (member.bot) {
        let botDB = botDB.findByIdAndDelete(member.id);
        if (botDB) {
          await botDB.delete()
        }
      }

      let canal = member.guild.channels.cache.find(e => e.id === "ID DO CANAL DE SAIDA AQUI")

      let embed = new MessageEmbed()
        .setColor('#148aff')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle('👋 __TCHAUZINHO__ 👋')
        .setDescription(`Tchau ${member.user}! Espero que volte algum dia para o **${member.guild.name}**! Agora só temos ${member.guild.memberCount}º membros no servidor!`)
        .setThumbnail(member.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 1024
        }))
        .setFooter('ID do usuário: ' + member.user.id)
        .setTimestamp();
      canal.send(embed)
    })

    this.on("message", async (message) => {
      if (message.author.bot || message.channel.type === "dm") return;
      if (!message.content.startsWith(this.config.prefix)) return;

      const args = message.content.slice(this.config.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      const cmd = this.commands.get(command) || this.commands.get(this.aliases.get(command));
      if (cmd) {
        const now = Date.now();
        const timestamps = this.cooldowns.get(cmd.config.name);
        const cooldownAmount = (cmd.config.cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            const hours = timestamps.get(message.author.id) + cooldownAmount;
            if (now < hours) {
              const hourleft = (expirationTime - now) / 3600;

              let tempo = moment(expirationTime - now).format('HH:mm:ss');
              return message.channel.send(`${message.author}, você precisar esperar mais \`${tempo}\` para executar esse comando!`).then(msg => msg.delete({
                timeout: 10000
              }))
            };
          };
        };
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        try {
          cmd.run(this, message, args);
        } catch (e) {
          console.log(e);
          return message.channel.send(`${message.author}, um erro aconteceu ao executar o comando \`${cmd.config.name}\`!`);
        };
      };
    });
  };
  async init() {
    fs.readdir("./src/commands", (err, files) => {
      if (err) return console.log(err);
      files.filter(a => a.split(".").pop() === "js");
      files.forEach(file => {
        const pull = require(`./commands/${file}`);
        console.log(`[${chalk.blue("COMMAND")}] Comando ${pull.config.name} carregado!`);
        this.cooldowns.set(pull.config.name, new Collection());
        this.commands.set(pull.config.name, pull);
        if (pull.config.aliases) pull.config.aliases.map(a => this.aliases.set(a, pull.config.name));
      });
    });
    this.login(process.env.TOKEN).then(() => {
      console.log(`[${chalk.red("SYSTEM")}] Sucesso ao logar no Discord!`);
    });
  };
};