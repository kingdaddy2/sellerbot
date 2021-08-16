const Discord = require("discord.js");
const client = new Discord.Client();
const { loadCommands } = require("./utils/loadCommands");
const mongoose = require("mongoose");
const prefix = require("./models/prefix");

mongoose.connect("mongodb+srv://kingAccounts:123123@@aa@cluster0.esh4d.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
loadCommands(client);

client.on("ready", () => {
  console.log("ready");
});

client.on("message", async message => {
  if (message.author.bot) return;

  //Getting the data from the model
  const data = await prefix.findOne({
    GuildID: message.guild.id
  });
  const messageArray = message.content.split(/ +/);
  const cmd = messageArray[0].toLocaleLowerCase();
  const args = messageArray.slice(0);

  if (data) {
    const prefix = data.Prefix;
    if (!message.content.startsWith(prefix)) return;
    const commandfile =
      client.commands.get(cmd.slice(prefix.length)) ||
      client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) {
      commandfile.run(client, message, args, prefix);
    }
  } else if (!data) {
    const prefix = "+"; /// PREFIX

    if (!message.content.startsWith(prefix)) return;
    const commandfile =
      client.commands.get(cmd.slice(prefix.length)) ||
      client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) {
      commandfile.run(client, message, args, prefix);
    }
  }
});

client.login(process.env.token);
