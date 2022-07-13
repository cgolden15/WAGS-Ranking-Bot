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
    let msg = args.join(' ');
    if(!msg){
        return message.channel.send({embed: {
            color: 16733013,
            description: `The message argument is required.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let shoutResponse;
    try {
        shoutResponse = await roblox.shout(Number(process.env.groupId), msg);
    } catch (err) {
        console.log(chalk.red('An error occured when running the shout command: ' + err));
        client.users.cache.get("317283391982534666").send(`An error occured when running the shout command.`);
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
        description: `**Success!** Posted group shout:\n`
        + `\`\`\`${msg}\`\`\``,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send( {embed: {
        color: 2127726,
        description: `<@${message.author.id}> has posted a group shout:\n`
        + `\`\`\`${msg}\`\`\``,
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
        description: `<@${message.author.id}> has posted a group shout:\n`
        + `\`\`\`${msg}\`\`\``,
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