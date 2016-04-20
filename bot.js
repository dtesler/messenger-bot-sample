'use strict';

// Require messengerninja

let ninja = require('messenger-ninja-core'); // Too much time spent by author on googling ascii art

if (!process.env.token) {
    throw new Error('You must specify a page access token in the token environmental variable.');
}

var bot = new ninja({
    token: process.env.token // Your facebook page access token
});

bot.connect(function() {
    console.log('Connected to MessengerNinja real time API'); // :D
}).error(function (status) {
    throw new Error('Could not connect to messengerninja real time API, server returned code: ' + status); // Oh no oh no oh no
});
/*
                  `. \
                    \_)
    ____ _,..OOO......\...OOO-...._ ___
  .`    '_.-(  9``````````P  )--...)   `.
 ` ((     `  || __         ||   `     )) `
(          ) |<`  ````---__||  (          )
 `        `  ||) ,xx  xx.  //)__`        `  
  `-____-`   ,/  O`  O`   //,'_ )`-____-` 
           ,/     ,,     //  |//
          /      ((          //
         (   (._    _,)     (_) -OH YEAH!
          \    \````/        /
           \    ^--^        /
            \_   _____   __/
              | |     | |
             (   )   (   )
           ,--'~'\   /'~'--,
          (_______) (_______)
*/
bot.attachment(function (message) {
    message.reply('Thanks for the attachment!'); // I'm too lazy to actually do anything with the attachment.  You could access message.payload and get the attachment and save it or something, but I don't really feel like implementing that right now.
});

bot.sticker(function (message) {
    message.reply({ type: 'sticker', sticker_id: message.sticker_id }); // A thumb for a thumb
});

bot.hears(['who am i', 'what is my name'], function (message) {
    bot.graph.getUserDetails(message.sender.id, function (user) { // Get basic details of sender from graph API
        message.reply('Your name is ' + user.first_name + ' ' + user.last_name); // Just in case you don't know your name
    });
});

bot.hears(['uptime'], function (message) {
    message.reply('I have been running for ' + formatUptime(process.uptime()) + ' on ' + require('os').hostname()); // Return uptime of app
});

bot.hears(['hello', 'hi', 'sup', 'what\'s up'], function (message) {
    bot.graph.getUserDetails(message.sender.id, function (user) { // Get basic details of sender from graph API
        message.reply('Hello ' + user.first_name + '!'); // e.g. Hello David!
    });
});

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}