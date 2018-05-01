const Discord = require('discord.js');
var bot = new Discord.Client();
const Client = require('fortnite');
const fortnite = new Client('3042528c-188c-41f8-9e75-51b3e7288cd4');
const prefix = "!";

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
        message.channel.send("**Leaders:**\n*MR3K*\n*Minty*");
    }                    
    if(msg == prefix + "botcode") {
        message.channel.send("**Actual bot code! -** https://github.com/Osmulak122/aethel/blob/master/index.js");
    }
     if(msg == prefix + "youtube") {
        message.channel.send("**Our Youtube! -** https://www.youtube.com/c/AethelFortnite");
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

                bot.channels.find("name", "bot-logs").send(msgauthor.username + "** cleared : **" + (fetched.size) + "** messages in channel :** " + (channelID));

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
                    .setColor(0xE6A12D)
                    
                message.channel.send(musichelp);
        }
            if(msg == prefix + "roster") {
                var roster = new Discord.RichEmbed()
                    .setDescription("**Aethel Roster:**")
                    .setThumbnail(bot.guilds.find("id", "440424875346231296").iconURL)
                    .addField("Leaders", "*MR3K\nMinty\nJdL*")
                    .addField("Players", "*Player\nPlayer\nPlayer\nPlayer*")
                    .addField("Designers","*Genizz\nDesigner\nDesigner\nDesigner*")
                    .addField("Editors", "*Editor\nEditor\nEditor*")
                    .setFooter('Roster might not be up to date')
                    .setColor(0xFF2017)
                    message.channel.send(roster);
            }          
            if(msg.startsWith("!stats") {
                    let username = args[0];
                    fortnite.user(username, platform).then(console.log);                    
                }                        
    });      
    bot.login(process.env.BOT_TOKEN);



