require('dotenv').config();
exports.run = async (client, message, args) => {
    return message.channel.send({embed: {
        color: 7948427,
        title: `Here are my commands:`,
        fields: [{
        name: `${process.env.prefix}help`,
        value: "Shows this list of commands."
      },
      {
        name: `${process.env.prefix}setrank <user> <rank name/number>`,
        value: "Ranks the user in the Roblox group to the specified rank number or name."
      },
      {
        name: `${process.env.prefix}promote <user>`,
        value: "Moves the user 1 rank up in the Roblox group."
      },
      {
        name: `${process.env.prefix}demote <user>`,
        value: "Moves the user 1 rank down in the Roblox group."
      },
      {
        name: `${process.env.prefix}fire <user>`,
        value: "Moves a user to the lowest rank possible."
      },
      {
        name: `${process.env.prefix}currentshout`,
        value: "Shows the current group shout."
      },
      {
        name: `${process.env.prefix}shout <message>`,
        value: "Posts a group shout."
      },
      {
        name: `${process.env.prefix}clearshout`,
        value: "Clears the group shout."
      },
      {
        name:`${process.env.prefix}ranks`,
        value: `Displays all group ranks and their ID`
      },
      {
        name: `Additional Info`,
        value: "System Monitor - [Here](https://stats.uptimerobot.com/5lYPru0zLY)\nRanking Access Role - <@&837019815418789939>"
      },
    ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Created by Golden!! for WA Guide School"
        },
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
}