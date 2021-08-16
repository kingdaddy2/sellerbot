const Discord = require("discord.js");
const client = new Discord.Client();
const data = require("../models/account");

module.exports.run = async (client, message, args, prefix) => {
  
  
  if (message.member.roles.cache.find(r => r.name === "Admins")) {
    
    
    let account = args.slice(1).join(" ");
    let noacc = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`:x: Error :`, `برجاء ارسال الحساب بعد الامر مباشره `)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      );
    if (!account) return message.channel.send(noacc);
    const findacc = await data.findOne({ Accountdata: account });
    if (findacc) {
      let accors = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField(`:x: Error :`, `الحساب موجود بالفعل من قبل ! `)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        );
      return message.channel.send(accors);
    }
    if (!findacc) {
      let usususu = "Minecar";
      let newman = new data({
        ServerID: message.guild.id,
        Acctype: usususu,
        Accountdata: account
      });
      let doneacc = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField(`✅ Done :`, `تم تسجيل الحساب بنجاح !`)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        );
      await message.channel.send(doneacc);
      await newman.save();
      await console.log(newman);
    }
  } else {
    message.channel.send(
      `:x: Error **${message.author.username}** : This command is only for Admins ..`
    );
  }
};

module.exports.config = {
  name: "add",
  aliases: ["اضافه", "add-acc"]
};
