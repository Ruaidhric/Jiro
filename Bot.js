const Discord = require('discord.js');  
const YTDL = require("ytdl-core");

const TOKEN = ""
const PREFIX = "J#";

function play(connection, message) {
    var server = servers[message.guild.id]; 

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

server.queue.shift();

server.dispatcher.on("end", function () {
if (server.queue[0]) play(connection, message);
else connection.disconnect();
});
}

var fortunes = [
"Yes",
"No",
"Maybe",
"Possibly",
"Definitely",
"Definitely Not"
];

var fortunes1 = [
    "100%",
    "99%",
    "98%",
    "97%",
    "96%",
    "95%",
    "94%",
    "93%",
    "92%",
    "91%",
    "90%",
    "89%",
    "88%",
    "87%",
    "86%",
    "85%",
    "84%",
    "83%",
    "82%",
    "81%",
    "80%",
    "79%",
    "78%",
    "77%",
    "76%",
    "75%",
    "74%",
    "73%",
    "72%",
    "71%",
    "70%",
    "69% ( ͡° ͜ʖ ͡°)",
    "68%",
    "67%",
    "66%",
    "65%",
    "64%",
    "63%",
    "62%",
    "61%",
    "60%",
    "59%",
    "58%",
    "57%",
    "56%",
    "55%",
    "54%",
    "53%",
    "52%",
    "51%",
    "50%",
    "49%",
    "48%",
    "47%",
    "46%",
    "45%",
    "44%",
    "43%",
    "42%",
    "41%",
    "40%",
    "39%",
    "38%",
    "37%",
    "36%",
    "35%",
    "34%",
    "33%",
    "32%",
    "31%",
    "30%",
    "29%",
    "28%",
    "27%",
    "26%",
    "25%",
    "24%",
    "23%",
    "22%",
    "21%",
    "20%",
    "19%",
    "18%",
    "17%",
    "16%",
    "15%",
    "14%",
    "13%",
    "12%",
    "11%",
    "10%",
    "9%",
    "8%",
    "7%",
    "6%",
    "5%",
    "4%",
    "3%",
    "2%",
    "1%",
    "0%",
    ];

    var fortunes2 = [
        "Looking good!", 
        "Terrible.",
        "Never going to happen.",
        "I think I see a new ship.",
        "Maybe.",
        "Probably going to happen.",
        "Probably not going to happen."
        ];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
console.log("Ready");
bot.user.setPresence({ game: { name: "with your soul." , type: 0 } });
});

bot.on("message", function(message) {
if (message.author.equals(bot.user)) return;

if (!message.content.startsWith(PREFIX)) return;

var args = message.content.substring(PREFIX.length).split(" ");

switch (args[0].toLowerCase()) {
case "your":
message.channel.sendMessage("You're*")
break;
case "8ball":
if (args[1]) {
    message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
} else {
    message.channel.sendMessage("Cannot Read")
}
case "ship":
if (args[1]) {
    message.channel.sendMessage(fortunes1[Math.floor(Math.random() * fortunes1.length)]);
} else {
    message.channel.sendMessage("Cannot tell.")
}
break;
case "match":
if (args[1]) {
    message.channel.sendMessage(fortunes2[Math.floor(Math.random() * fortunes2.length)]);
} else {
    message.channel.sendMessage("Cannot tell.")
}
break;
case "help":
var embed = new Discord.RichEmbed()
.addField("Basic Commands:", "Ping, Marco")
.addField("Chance Commands:", "8Ball, Ship, Match")
.addField("Music Commands:", "Play, Skip, Stop")
.setColor(0X11396c)
.setFooter("Created by @Evilbatman#5203")
message.channel.sendEmbed(embed);
break;
case "marco":
message.channel.sendMessage(message.author.toString() + " Polo!");
break;
case "ping":
message.channel.sendMessage(message.author.toString() + " Pong");
break;
case "play":
if(!args[1]) {
    message.channel.sendMessage("Please provide me with a link!");
    return;
}

if (!message.member.voiceChannel) {
    message.channel.sendMessage("Please join a voice channel!");
    return;
}

if(!servers[message.guild.id]) servers[message.guild.id] = {
queue: []
};

var server = servers[message.guild.id];

server.queue.push(args[1]);

if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
play(connection, message);
});
break;
case "skip":
var server = servers[message.guild.id];

if(server.dispatcher) server.dispatcher.end();
break;
case "stop":
var server = servers[message.guild.id];

if (message.guild.voiceConnection)
        {
            for (var i = server.queue.length - 1; i >= 0; i--) 
            {
                server.queue.splice(i, 1);
         }
            server.dispatcher.end();
            console.log("[" + new Date().toLocaleString() + "] Stopped the queue.");
        }
break;
default:
message.channel.sendMessage("Invalid command")
}
});

bot.login(TOKEN);   
