const Discord = require("discord.js");
const client = new Discord.Client();
const data = require("../models/account");

module.exports.run = async (client, message, args, prefix) => {
  let num = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  let args2 = parseInt(num);
  if (!num) return message.channel.send(`**:x: برجاء ادخال عدد الحسابات !**`);
  const findacc = await data.find({}).limit(args2);
  let role = message.guild.roles.cache.find(r => r.id === "865401285503090749");
  let chadiowe = client.channels.cache.find(
    channel => channel.id === "854477032707850241"
  );
  let owner = "463208341804548097";

  if (findacc) {
    if (num) {
      try {
        message.author.send(`Checking ur DM !`);
      } catch {
        return message.channel.send(`:x: فشلت العمليه .. خاصك مقفل !`);
      }
      if (num > findacc.length)
        return message.channel.send(
          `**:x: لا يوجد هذا العدد من الحسابات !**\n العدد الموجود : ${findacc.length}`
        );
      if (num >= 10) {
        let one = 8000;
        let price2 = num * one;
        let price = (price2 * 95) / 100;
        let start = new Discord.MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setFooter(
            client.user.username,
            client.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `برجاء تحويل : \`${price2}\` الى : <@${owner}> \n\`\`\`#credit <@${owner}> ${price2}\`\`\``
          );
        message.channel.send(start).then(async m => {
          const filter = response =>
            response.content.startsWith(
              `**:moneybag: | ${message.author.username}, has transferred `
            ) &&
            response.content.includes(`${owner}`) &&
            response.author.id === "282859044593598464" &&
            response.content.includes(price2);
          m.channel
            .awaitMessages(filter, {
              max: 1,
              time: 60 * 1000 * 4,
              errors: ["time"]
            })
            .then(async memem => {
              let acc = "";
              let ass = findacc.map(async d => (acc += `${d.Accountdata}\n`));
              let asssss = findacc.map(async d =>
                data.findOneAndRemove({ Accountdata: d.Accountdata })
              );
              message.author.send(
                `**السلام عليكم عزيزي العميل ، الحسابات كلها مكتوبه بالشكل الاتي : \n Email:Password**\n\n${acc}`
              );
              await message.channel.send(`**تم تسليمك الحسابات بنجاح !**`);
              let logembed = new Discord.MessageEmbed()
                .setAuthor(
                  message.author.username,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL({ dynamic: true })
                )
                .setTitle(`تم اعطاء حساب جديد :`)
                .setDescription(
                  `**الشخص المستلم : ${message.author} \n عدد الحسابات : ${num}**`
                );
              await chadiowe.send(logembed);
              await message.member.roles.add(role);
            })
            .catch(err => {
              m.channel
                .send("انتهت مهلة التحويل تم الغاء العملية")
                .then(err => {
                  setTimeout(() => {
                    err.delete();
                    m.delete();
                  }, 5000);
                });
            });
        });
      } else {
        let one = 1000;
        let price2 = num * one;
        let price = (price2 * 95) / 100;

        let start = new Discord.MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setFooter(
            client.user.username,
            client.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `برجاء تحويل : \`${price2}\` الى : <@${owner}> \n\`\`\`#credit <@${owner}> ${price2}\`\`\``
          );
        message.channel.send(start).then(async m => {
          const filter = response =>
            response.content.startsWith(
              `**:moneybag: | ${message.author.username}, has transferred `
            ) &&
            response.content.includes(`${owner}`) &&
            response.author.id === "282859044593598464" &&
            response.content.includes(price2);
          m.channel
            .awaitMessages(filter, {
              max: 1,
              time: 60 * 1000 * 4,
              errors: ["time"]
            })
            .then(async memem => {
              let acc = "";
              let ass = findacc.map(async d => (acc += `${d.Accountdata}\n`));
              let asssss = findacc.map(async d =>
                data.findOneAndRemove({ Accountdata: d.Accountdata })
              );
              message.author.send(
                `**السلام عليكم عزيزي العميل ، الحسابات كلها مكتوبه بالشكل الاتي : \n Email:Password**\n\n${acc}`
              );
              await message.channel.send(`**تم تسليمك الحسابات بنجاح !**`);
              let logembed = new Discord.MessageEmbed()
                .setAuthor(
                  message.author.username,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()
                .setFooter(
                  client.user.username,
                  client.user.displayAvatarURL({ dynamic: true })
                )
                .setTitle(`تم اعطاء حساب جديد :`)
                .setDescription(
                  `**الشخص المستلم : ${message.author} \n عدد الحسابات : ${num}**`
                );
              await chadiowe.send(logembed);
              await message.member.roles.add(role);
            })
            .catch(err => {
              m.channel
                .send("انتهت مهلة التحويل تم الغاء العملية")
                .then(err => {
                  setTimeout(() => {
                    err.delete();
                    m.delete();
                  }, 5000);
                });
            });
        });
      }
    }
  }
  if (!findacc) {
    message.channel.send(`لا يوجد حسابات !`);
  }
};

module.exports.config = {
  name: "buy",
  aliases: []
};
