const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Ranking Permissions", "Director", "Deputy Director"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "You do not have the necessary permissions to run this command.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let clearShoutResponse;
    try {
        clearShoutResponse = await roblox.shout(Number(process.env.groupId), '');
    } catch (err) {
        console.log(chalk.red('An error occured when running the clearshout command: ' + err));
        client.users.cache.get("317283391982534666").send('An error occured when running the clearshout command.\n \n https://replit.com/@cgolden15/WAGS-Ranking-Bot#commands/index.js');
        return message.channel.send({embed: {
            color: 16733013,
            description: `Oopsie Whoopsie! ~uwu~ We made a fucky wucky!! A wittle fucko boingo! <@317283391982534666> will work VEWY HAWD to fix this!`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    message.channel.send({embed: {
        color: 9240450,
        description: `**Success!** Cleared group shout.`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    let logchannel = message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        description: `<@${message.author.id}> has cleared the group shout.`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Action Logs'
        },
        timestamp: new Date()
    }});
    let logChannel = client.channels.cache.get('839632546027274240');
    logChannel.send({embed: {
      color: 2127726,
        description: `<@${message.author.id}> has cleared the group shout.`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Action Logs'
        },
        timestamp: new Date()
    }});  
}
