require('dotenv').config();
exports.run = async (client, message, args) => {
    return message.channel.send({embed: {
        color: 7948427,
        title: `Rank ID's:`,
        fields: [{
        name: `Guide Ranks:`,
        value: "Junior Guide - 2\nExperienced Guide - 3\nSenior Guide - 6\n⠀\n"
      },
      {
        name: `Pilot Ranks:`,
        value: "Pilot in Training - 4\nPilot - 5\nSenior Pilot - 7\n⠀\n"
      },
      {
        name: `Staff Ranks:`,
        value: "Trial Instructor - 8\nInsructor - 9\nSenior Instructor - 10\nTrial Pilot instructor - 12\nPilot Instructor - 13\nSenior Pilot Instructor - 14\nLead Instructor - 16\nLead Pilot Instructor - 17\nBoard of Directors - 19\nDeputy Director - 20\nDirector - 20\n⠀\n"
      },
      {
        name: `Group Links`,
        value:"- [WAGS](https://www.roblox.com/groups/9571183/Winter-Adventures-Guide-School-WAGS#!/about)\n- [WA](https://www.roblox.com/groups/9436306/Winter-Adventures-WA#!/about)"
      },
    ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatar_url,
          text: "Winter Adventures Guide School",
        }
    }});
}