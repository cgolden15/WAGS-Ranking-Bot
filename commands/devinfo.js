const express = require('express');
const app = express();
const Discord = require('discord.js');
require('dotenv').config();
const gid = process.env['groupId']
const logid = process.env['logchannelid']
const maxrank = process.env['maximumRank']
const client = new Discord.Client({
  fetchAllMembers: true
})

exports.run = async (client, message, args) => {
    return message.channel.send({embed: {
        color: 0x2CEDFC,
        title: `Dev panel:`,
        fields: [{
        name: `ENV Var's:`,
        value: `Group ID: ${gid}\nLog Channel ID: ${logid}\nMax rank: ${maxrank}`
      },
      {
        name: `Invite URL:`,
        value: "- [here](https://discord.com/api/oauth2/authorize?client_id=837002860574539796&permissions=8&scope=bot)"
      },
      {
        name: `Group Links`,
        value:"- [WAGS](https://www.roblox.com/groups/9571183/Winter-Adventures-Guide-School-WAGS#!/about)\n- [WA](https://www.roblox.com/groups/9436306/Winter-Adventures-WA#!/about)"
      },
    ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatar_url,
          text: "By: Golden!!#8008 for Winter Adventures Guide School",
        }
    }});
}