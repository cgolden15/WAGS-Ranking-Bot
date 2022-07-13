const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

async function getRankName(func_group, func_user){
    let rolename = await roblox.getRankNameInGroup(func_group, func_user);
    return rolename;
}

async function getRankID(func_group, func_user){
    let role = await roblox.getRankInGroup(func_group, func_user);
    return role;
}

async function getRankFromName(func_rankname, func_group){
    let roles = await roblox.getRoles(func_group);
    let role = await roles.find(rank => rank.name == func_rankname);
    if(!role){
        return 'NOT_FOUND';
    }
    return role.rank;
}

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Ranking Permissions", "Director", "Deputy Director"].includes(role.name))){
      client.users.cache.get("317283391982534666").send('An error occured when running the setrank command.\n \n https://replit.com/@cgolden15/WAGS-Ranking-Bot#commands/index.js');
        return message.channel.send({embed: {
            color: 16733013,
            description: "You do not have the necessary permissions to run this command.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }})
    }
    let username = args[0];
    if(!username){
        return message.channel.send({embed: {
            color: 16733013,
            description: "The username argument is required.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let rank = Number(args[1]);
    let newrank;
    if(!rank){
        let midrank = args.slice(1).join(' ');
        if(!midrank){
            return message.channel.send({embed: {
                color: 16733013,
                description: "The rank argument is required.",
                author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                }
            }});
        }
        newrank = await getRankFromName(midrank, Number(process.env.groupId));
    } else {
        newrank = rank;
    }
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send({embed: {
            color: 16733013,
            description: `Oops! ${username} is not a Roblox user. Perhaps you misspelled?`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let rankInGroup = await getRankID(Number(process.env.groupId), id);
    let rankNameInGroup = await getRankName(Number(process.env.groupId), id);
    if(Number(process.env.maximumRank) <= rankInGroup || Number(process.env.maximumRank) <= newrank){
        return message.channel.send({embed: {
            color: 16733013,
            description: "This rank cannot be ranked by this bot.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    if(newrank == 'NOT_FOUND'){
        return message.channel.send({embed: {
            color: 16733013,
            description: "The specified rank could not be found.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let setRankResponse;
    try {
        setRankResponse = await roblox.setRank(Number(process.env.groupId), id, newrank);
    } catch (err) {
        console.log(chalk.red('An error occured when running the setrank command: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `Oopsie Whoopsie! ~uwu~ We made a fucky wucky!! A wittle fucko boingo! <@317283391982534666> will work VEWY HAWD to fix this!`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let newRankName = await getRankName(Number(process.env.groupId), id);
    message.channel.send({embed: {
        color: 9240450,
        description: `**Success!** Ranked ${username} to ${setRankResponse.name} (${setRankResponse.rank})`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        description: `<@${message.author.id}> has ranked ${username} from ${rankNameInGroup} (${rankInGroup}) to ${setRankResponse.name} (${setRankResponse.rank}).`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Action Logs'
        },
        timestamp: new Date(),
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
        }
    }});
    let logChannel = client.channels.cache.get('839632546027274240');
    logChannel.send({embed: {
        color: 2127726,
        description: `<@${message.author.id}> has ranked ${username} from ${rankNameInGroup} (${rankInGroup}) to ${setRankResponse.name} (${setRankResponse.rank}).`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Action Logs'
        },
        timestamp: new Date(),
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
        }
    }});
}