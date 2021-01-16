const Discord = require('discord.js');
module.exports = {
  config: {
    name: "addbot",
    aliases: ['add-bot', 'adicionar-bot'],
    category: 'Utilidades',
    cooldown: 8,
    description: 'Adicione o bot no servidor!',
    usage: `bm!addbot`
  },
  run: async (client, message, args) => {
    const embed_priv = new Discord.MessageEmbed()
      .setTitle(`**OLHE PRIVADO POR FAVOR 😉**`)
      .setColor('#148aff')
      .setDescription(`__Mandei as perguntas no seu privado!__\n**Caso não tenha recebido, ative a sua DM para mensagens de membros deste servidor!**`)
      .setThumbnail(message.guild.iconURL({
        dynamic: true,
        size: 2048
      }))
      .setFooter(`${client.user.username} | Todos os direitos reservados.`, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(`${message.author}`, embed_priv).then(msg => {
      msg.react('☑️');
    })

    await message.author.createDM();
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Olá ${message.author.username}, você está prestes a enviar seu bot para avaliação!\nQual é o nome do bot? Obs: Por favor, bote o nome certo do bot, caso contrário, irá ser reprovado!`)
      .setColor('#148aff')
    message.author.send(embed);
    var tazer = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
      time: 1000 * 50,
      max: 1
    });
    tazer.on('collect', r => {
      let bot = r.content;
      let embed1 = new Discord.MessageEmbed()
        .setColor('#148aff')
        .setAuthor(`${message.author.username}, qual é o prefix do seu bot?`)
      message.author.send(embed1);

      var tazer1 = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
        time: 1000 * 50,
        max: 1
      });
      tazer1.on('collect', r => {
        let prefix = r.content;
        let embed2 = new Discord.MessageEmbed()
          .setColor('#148aff')
          .setAuthor(`${message.author.username}, qual o ID do seu bot?`)
        message.author.send(embed2);

        var tazer3 = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
          time: 1000 * 50,
          max: 1
        });
        tazer3.on('collect', r => {
          let id = r.content;
          let embed3 = new Discord.MessageEmbed()
            .setColor('#148aff')
            .setAuthor(`${message.author.username}, qual o comando que mostra todos os comandos?`)
          message.author.send(embed3);

          var tazer5 = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
            time: 1000 * 50,
            max: 1
          });
          tazer5.on('collect', r => {
            let comando = r.content;
            let embed4 = new Discord.MessageEmbed()
              .setColor('#148aff')
              .setAuthor(`${message.author.username}, qual a linguagem do seu bot? (JavaScript, Python ou DBD)`)
            message.author.send(embed4);

            var tazer4 = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
              time: 1000 * 50,
              max: 1
            });
            tazer4.on('collect', r => {
              let linguagem = r.content;
              let embed4 = new Discord.MessageEmbed()
                .setColor('#148aff')
                .setAuthor(`${message.author.username}, qual o seu nome do Discord? Ex: NathanDark#8948`)
              message.author.send(embed4);

              var tazer6 = message.author.dmChannel.createMessageCollector(a => a.author.id == message.author.id, {
                time: 1000 * 50,
                max: 1
              });
              tazer6.on('collect', r => {
                let nome = r.content;

                let embed5 = new Discord.MessageEmbed()
                  .setTitle("Resumo")
                  .setColor('#148aff')
                  .setDescription("Deseja realmente enviar seu bot para análise?\n\n\`✅\` **Sim**\n\`❌\` **Não**\n(resumo abaixo)")
                  .addField("Discord:", `${nome}`)
                  .addField("Nome do Bot:", `${bot}`)
                  .addField("Prefix", `${prefix}`)
                  .addField("ID do bot:", `${id}`)
                  .addField("Comando que mostra todos os comandos:", `${comando}`)
                  .addField("Linguagem do bot:", `${linguagem}`)
                message.author.send(embed5).then(msg => {
                  msg.react("✅").then(() => {
                    msg.react("❌");
                  });

                  const sim = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `✅` && user.id == message.author.id, {
                    time: 60000
                  })
                  const nao = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `❌` && user.id == message.author.id, {
                    time: 60000
                  })

                  nao.on('collect', r => {
                    msg.delete(embed)
                    let embed_delete = new Discord.MessageEmbed()
                      .setDescription(`❌ **__SOLICITAÇÃO DE ANÁLISE CANCELADA COM SUCESSO!__**`)
                      .setColor('#148aff')
                    message.author.send(embed_delete)
                  })
                  sim.on('collect', r => {
                    msg.delete(embed)
                    let embed1 = new Discord.MessageEmbed()
                      .setDescription("✅ **__SOLICITAÇÃO DE ANÁLISE ENVIADA COM SUCESSO!__**")
                      .setColor('#148aff')
                    message.author.send(embed1)
                    let usuarioicone = message.author.displayAvatarURL();
                    let canal = message.guild.channels.cache.get("ID DO CANAL DE LOGS DE BOTS ADICIONADOS")
                    const analiseplayer = new Discord.MessageEmbed()
                      .setAuthor('ANÁLISE SOLICITADA!')
                      .setDescription(`Convide o bot [aqui](https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=0&scope=bot)`)
                      .addField('Dono:', `\`${nome}\``)
                      .addField('Bot:', `${bot}`)
                      .addField('Prefix:', `\`${prefix}\``)
                      .addField('ID:', `\`${id}\``)
                      .addField('Comando:', `\`${comando}\``)
                      .addField('Linguagem:', `\`${linguagem}\``)
                      .setThumbnail(usuarioicone)
                      .setColor('#148aff')
                      .setFooter(`${client.user.username} | Todos os direitos reservados.`, client.user.displayAvatarURL())
                    canal.send('<@&ID DE UM CARGO AQUI>', analiseplayer)

                    let channel = message.guild.channels.cache.get('CANAL ONDE VAI ENVIAR O channel.send')
                    channel.send(`<:amarelinha:744920729975521347> | ${message.author} enviou o bot \`${bot}\` para análise!`)
                  })
                })
              })
            })
          })
        })
      })
    })
  }
}