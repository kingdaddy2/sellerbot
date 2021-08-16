const Discord = require("discord.js");
const client = new Discord.Client();
const data = require("../models/account");

module.exports.run = async (client, message, args, prefix) => {
  if (message.member.roles.cache.find(r => r.name === "Admins")) {
    const findacc = await data.find({});
    message.channel.send(`**لدي : ${findacc.length} حساب **`);
  } else {
    message.channel.send(
      `:x: Error **${message.author.username}** : This command is only for Admins ..`
    );
  }
};

module.exports.config = {
  name: "stock",
  aliases: []
};
