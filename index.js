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
         //invite links
    }
    if(msg.startsWith("https://discord.gg/" || "http://discord.gg/" || "discord.gg")) {
        message.delete();
        message.channel.send("**Invite links aren't allowed**");

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

                bot.channels.find("name", "bot-logs").send(`**${msgauthor.username}**` + " cleared : " + `**${fetched.size}**` + "messages in channel : " + (channelID));

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
                    .addField("Leaders", "JdL\nMinty\nMR3K")
                    .addField("Players","GypzD\nJoy\nJozoKappa\nKrKs\nloveTRiiSTaN\nPetee\nPryyme")
                    .addField("Designers","Genizz\nAspire\nMina")
                    .addField("Editors","Michos")
                    .setFooter('Roster might not be up to date')
                    .setColor(0xFF2017)
                    message.channel.send(roster);
            }
            if(msg.startsWith("!stats")) {
                var playerName = args[0];
                var platform = args[1];
                var mode = args[2] || "all";
                if(!args[0]) {
                    message.channel.send("https://cdn.discordapp.com/attachments/440590887022493736/441631716256514068/Group_5.png")
                }
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

                    //statsembed pc
                if(platform == "pc") {
                    if(mode == "all") { 
                        var statsembed = new Discord.RichEmbed()
                        .setTitle("All Combined Stats")
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

                        return message.channel.send(statsembed);

                    } else if(mode == "solo") {
                        var solopc = new Discord.RichEmbed()
                        .setTitle("Solo Mode Stats")
                        .setAuthor(playerName)
                        .addField(`Wins`, `${stats.br.stats.pc.solo.wins}`, true)
                        .addField(`Win Rate`, `${stats.br.stats.pc.solo.winRate}`, true)
                        .addField(`Total Score`, `${stats.br.stats.pc.solo.score}`, true)
                        .addField(`Kills`, `${stats.br.stats.pc.solo.kills}`, true)
                        .addField(`KD`, `${stats.br.stats.pc.solo.kpd}`, true)
                        .addField(`Matches Played`, `${stats.br.stats.pc.solo.matchesPlayed}`, true)
                        .setColor(0xFF2017)
                        .setThumbnail(message.author.avatarURL)
                        .setFooter(`Last stats update :  ${stats.lastUpdate}`)

                        return message.channel.send(solopc);
                
                    } else if (mode == "duo") {
                        var duopc = new Discord.RichEmbed()
                        .setTitle("Duo Mode Stats")
                        .setAuthor(playerName)
                        .addField(`Wins`, `${stats.br.stats.pc.duo.wins}`, true)
                        .addField(`Win Rate`, `${stats.br.stats.pc.duo.winRate}`, true)
                        .addField(`Total Score`, `${stats.br.stats.pc.duo.score}`, true)
                        .addField(`Kills`, `${stats.br.stats.pc.duo.kills}`, true)
                        .addField(`KD`, `${stats.br.stats.pc.duo.kpd}`, true)
                        .addField(`Matches Played`, `${stats.br.stats.pc.duo.matchesPlayed}`, true)
                        .setColor(0xFF2017)
                        .setThumbnail(message.author.avatarURL)
                        .setFooter(`Last stats update :  ${stats.lastUpdate}`)
    
                        return message.channel.send(duopc);

                    } else if (mode == "squad") {
                        var squadpc = new Discord.RichEmbed()
                            .setTitle("Squad Mode Stats")
                            .setAuthor(playerName)
                            .addField(`Wins`, `${stats.br.stats.pc.squad.wins}`, true)
                            .addField(`Win Rate`, `${stats.br.stats.pc.squad.winRate}`, true)
                            .addField(`Total Score`, `${stats.br.stats.pc.squad.score}`, true)
                            .addField(`Kills`, `${stats.br.stats.pc.squad.kills}`, true)
                            .addField(`KD`, `${stats.br.stats.pc.squad.kpd}`, true)
                            .addField(`Matches Played`, `${stats.br.stats.pc.squad.matchesPlayed}`, true)
                            .setColor(0xFF2017)
                            .setThumbnail(message.author.avatarURL)
                            .setFooter(`Last stats update :  ${stats.lastUpdate}`)
        
                        return message.channel.send(squadpc);
                    }
                }
                            
                            //ps4 stats
                    if(platform == "ps4") {
                        if(mode == "all") {
                        var statsembedps4 = new Discord.RichEmbed()
                        .setTitle("All Combined Stats")
                        .setAuthor(playerName)
                        .addField(`Wins`, `${stats.br.stats.ps4.all.wins}`, true)
                        .addField(`Win Rate`, `${stats.br.stats.ps4.all.winRate}`, true)
                        .addField(`Total Score`, `${stats.br.stats.ps4.all.score}`, true)
                        .addField(`Kills`, `${stats.br.stats.ps4.all.kills}`, true)
                        .addField(`KD`, `${stats.br.stats.ps4.all.kpd}`, true)
                        .addField(`Matches Played`, `${stats.br.stats.ps4.all.matchesPlayed}`, true)
                        .setColor(0xFF2017)
                        .setThumbnail(message.author.avatarURL)
                        .setFooter(`Last stats update :  ${stats.lastUpdate}`)
        
                        return message.channel.send(statsembedps4);
                           
                    } else if (mode == "solo") {
                        var solops4 = new Discord.RichEmbed()
                            .setTitle("Solo Mode Stats")
                            .setAuthor(playerName)
                            .addField(`Wins`, `${stats.br.stats.ps4.solo.wins}`, true)
                            .addField(`Win Rate`, `${stats.br.stats.ps4.solo.winRate}`, true)
                            .addField(`Total Score`, `${stats.br.stats.ps4.solo.score}`, true)
                            .addField(`Kills`, `${stats.br.stats.ps4.solo.kills}`, true)
                            .addField(`KD`, `${stats.br.stats.ps4.solo.kpd}`, true)
                            .addField(`Matches Played`, `${stats.br.stats.ps4.solo.matchesPlayed}`, true)
                            .setColor(0xFF2017)
                            .setThumbnail(message.author.avatarURL)
                            .setFooter(`Last stats update :  ${stats.lastUpdate}`)
            
                            return message.channel.send(solops4);
            
                    } else if (mode == "duo") {
                        var duops4 = new Discord.RichEmbed()
                            .setTitle("Duo Mode Stats")
                            .setAuthor(playerName)
                            .addField(`Wins`, `${stats.br.stats.ps4.duo.wins}`, true)
                            .addField(`Win Rate`, `${stats.br.stats.ps4.duo.winRate}`, true)
                            .addField(`Total Score`, `${stats.br.stats.ps4.duo.score}`, true)
                            .addField(`Kills`, `${stats.br.stats.ps4.duo.kills}`, true)
                            .addField(`KD`, `${stats.br.stats.ps4.duo.kpd}`, true)
                            .addField(`Matches Played`, `${stats.br.stats.ps4.duo.matchesPlayed}`, true)
                            .setColor(0xFF2017)
                            .setThumbnail(message.author.avatarURL)
                            .setFooter(`Last stats update :  ${stats.lastUpdate}`)
                
                            return message.channel.send(duops4);
            
                    } else if (mode == "squad") {
                        var squadps4 = new Discord.RichEmbed()
                            .setTitle("Squad Mode Stats")
                            .setAuthor(playerName)
                            .addField(`Wins`, `${stats.br.stats.ps4.squad.wins}`, true)
                            .addField(`Win Rate`, `${stats.br.stats.ps4.squad.winRate}`, true)
                            .addField(`Total Score`, `${stats.br.stats.ps4.squad.score}`, true)
                            .addField(`Kills`, `${stats.br.stats.ps4.squad.kills}`, true)
                            .addField(`KD`, `${stats.br.stats.ps4.squad.kpd}`, true)
                            .addField(`Matches Played`, `${stats.br.stats.ps4.squad.matchesPlayed}`, true)
                            .setColor(0xFF2017)
                            .setThumbnail(message.author.avatarURL)
                            .setFooter(`Last stats update :  ${stats.lastUpdate}`)
                    
                            return message.channel.send(squadps4);
                    } 
                }
                        
                    
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
