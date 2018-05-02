const Discord = require('discord.js');
var bot = new Discord.Client();
const prefix = "!";
var request = require('request');


bot.on("guildMemberAdd", function(member) {
    var role_rules = member.guild.roles.find('name', 'Unaccepted Rules');
    member.addRole(role_rules)
});



bot.on("ready", function() {
    bot.user.setActivity('!help');
    console.log("Im Ready!");
});



bot.on("message", function(message) {

    var msg = message.content.toLowerCase();
    var cont = message.content.slice(prefix.length).split(" ");
    var args = cont.slice(1);
    var msgauthor = message.author;
    var channel1 = bot.channels.find('name', 'readme');


    if(message.channel == channel1) {
        if (msg == "!agree" || msg == "!Agree" || msg == "!AGREE" || msg == '"agree"' || msg == '"Agree"' || msg == '"AGREE"' || msg == "agree" || msg == "Agree" || msg == "AGREE" || msg == '"!agree"' || msg == '"!Agree"'|| msg == '"!AGREE"') {
            var role_rules = message.member.guild.roles.find('name', 'Unaccepted Rules');
            message.member.removeRole(role_rules);
            message.author.send("**Verification Completed!**\n*Welcome to the server and have fun!*");
            bot.channels.find('name', 'bot-logs').send(msgauthor.toString() + ", *Agreed to Rules!*");
        } else
             message.author.send("**You have propably misspelled.**\n*Try again in `#readme` chat on Aethel discord!*");
    }
    
    if (message.channel == channel1) {
        message.delete();
    }
   
    if (msg == prefix + "help") {
        message.channel.send("__**Commands :**__\n\n**!youtube**\n**!leaders**\n**!botcode**\n\n__**Music:**__\n**!musicbot** *Some music commands*");
    }
    if (msg == prefix + "leaders") {
        message.channel.send("**Leaders:**\n*MR3K*\n*Minty*\n*JdL*");
    }                    
    if(msg == prefix + "botcode") {
        message.channel.send("**Actual bot code! -** https://github.com/Osmulak122/aethel/blob/master/index.js");
    }
     if(msg == prefix + "youtube") {
        message.channel.send("**Our Youtube! -** https://www.youtube.com/AethelFortnite");
    }

    if(msg.startsWith(prefix + "clear")) {


        var channelID = message.channel;

        async function clear() {
            message.delete();

            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                message.channel("You don't have permissions to use this command!");
                return;
            }

            if (isNaN(args[0])) {
                message.channel.send("**Please include amount of messages you want to delete**");
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send("Can't clear the chat!"));

                bot.channels.find("name", "bot-logs").send(`**${msgauthor.username}**` + " cleared : " + `**${fetched.size}**` + "** messages in channel :** " + (channelID));

 }
        clear();
    }
            if(msg == prefix + "musicbot") {
                var musichelp = new Discord.RichEmbed()
                    .setDescription("Music Bot Commands!")
                    .setThumbnail(bot.users.find("id", "440572291907321857").avatarURL)
                    .addField("?play <link>", "Queueing song", true)
                    .addField("?skip", "Skips the song", true)
                    .addField("?join", "Summons bot", true)
                    .addField("?leave", "Disconnects from channel", true)
                    .addField("?pause", "Pauses playback",true)
                    .addField("?resume", "Resumes playback",true)
                    .addField("?shuffle", "Shuffles Queue",true)
                    .addField("?queue", "Shows current queue", true)
                    .setFooter('Remember that music commands are executed with "?" prefix.')
                    .setColor(0xFF2017)
                    
                message.channel.send(musichelp);
        }
            if(msg == prefix + "roster") {
                var roster = new Discord.RichEmbed()
                    .setDescription("Aethel Roster")
                    .setThumbnail(bot.guilds.find("id", "440424875346231296").iconURL)
                    .addField("Leaders", "**MR3K\nMinty\nJdL**")
                    .addField("Players","KrKs")
                    .addField("Designers","Genizz")
                    .addField("Editors")
                    .setFooter('Roster might not be up to date')
                    .setColor(0xFF2017)
                    message.channel.send(roster);
            }
            if(msg.startsWith("!stats")) {
                let platform = args[1] || "pc";
                var playerName = args[0];

                var options = {
                method: "GET",
                url: `https://fortnite.y3n.co/v2/player/${playerName}`,
                headers: {
                    'User-Agent': 'nodejs request',
                    'X-Key': "c77fTff744ovhhm4b34l"
                }
            }  
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var stats = JSON.parse(body);

                    //statsembed

                    var statsembed = new Discord.RichEmbed()
                        .setTitle("Fortnite Stats")
                        .setAuthor(playerName)
                        .addField(`Wins`, `${stats.br.stats.pc.all.wins}`, true)
                        .addField(`Win Rate`, `${stats.br.stats.pc.all.winRate}`, true)
                        .addField(`Total Score`, `${stats.br.stats.pc.all.score}`, true)
                        .addField(`Kills`, `${stats.br.stats.pc.all.kills}`, true)
                        .addField(`KD`, `${stats.br.stats.pc.all.kpd}`, true)
                        .addField(`Matches Played`, `${stats.br.stats.pc.all.matchesPlayed}`, true)
                        .setColor(0xFF2017)
                        .setThumbnail(message.author.avatarURL)
                        .setFooter(`Last stats update :  ${stats.lastUpdate}`)

                        message.channel.send(statsembed);

                } else {
                    console.log(error);
                }
            })    
            
        }
        if(msg == prefix + "servers") {
            var options2 = {
                method: "GET",
                url: `https://fortnite.y3n.co/v2/gamestatus`,
                headers: {
                    'User-Agent': 'nodejs request',
                    'X-Key': "c77fTff744ovhhm4b34l"
                }
            }
            request(options2, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var stats = JSON.parse(body);
                    message.channel.send(`Fortnite servers are **${stats.status}**`)    
            }  else {
                console.log(error);
            }
        })
    }


});      
bot.login(process.env.BOT_TOKEN);