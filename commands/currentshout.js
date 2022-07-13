const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    let shout;
    try {
        shout = await roblox.getShout(Number(process.env.groupId));
    } catch (err) {
        console.log(chalk.red('An error occured when running the currentshout command: ' + err));
        client.users.cache.get("317283391982534666").send('An error occured when running the currentshout command.');
        return message.channel.send({embed: {
            color: 16733013,
            description: `Oopsie Whoopsie! ~uwu~ We made a fucky wucky!! A wittle fucko boingo! <@317283391982534666> will work VEWY HAWD to fix this!`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
  if(shout.body){
    message.channel.send({embed: {
        color: 7948427,
        description: `**Posted by ${shout.poster.username}**\n${shout.body}`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${shout.poster.username}`
        }
    }});
  } else {
        message.channel.send({embed: {
        color: 7948427,
        description: `**Posted by ${shout.poster.username}**\n*Shout cleared.*`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${shout.poster.username}`
        }
    }});
  }
}
