'use strict';
import discord from 'discord.io';
import logger from 'winston';
import { weatherFetch, nyeh } from './helpers';

var auth = require('../auth.json');

// Setup the logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});

// Initialize the bot.
const bot = new discord.Client({
  token: auth.discord,
  autorun: true
});

var weatherJsonObject = {}
var regularWeatherNotice = 'The weather has not been updated yet.';

var weatherUpdate = () => {
  weatherFetch().then((resp) => {
    logger.info("Response received")
    logger.info(resp[0]);
    regularWeatherNotice = resp[0]
    weatherJsonObject = resp[1]
  });
};

setInterval( weatherUpdate, 300000);

const commands = (user, userID, channelID, message, evt) => {

  var args = message.substring(1).split(' ');
  var cmd = args[0].toLowerCase();
  args = args.splice(1);

  switch(cmd){
      case 'weather':
          bot.sendMessage({
              to: channelID,
              message: regularWeatherNotice
          })
  }
}

bot.on('ready', function(evt) {
  weatherUpdate();
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - ' + bot.id);
  logger.info("These are the channels I know about")
  Object.keys(bot.channels).map(c =>
    logger.info(bot.channels[c].name + " : \t\t\t" + bot.channels[c].guild_id));
});

bot.on('message', function(user, userID, channelID, message, evt) {

  if (message.substring(0, 1) == '!') {
    commands(user, userID, channelID, message, evt);
  }else if(!user.startsWith('simpleton')){
    // This gets silly
    let ranNum = Math.random() * 100
    if( ranNum > 80) { // If it's 1/3rd of the time
      bot.sendMessage({
        to: channelID,
        message: nyeh(message)
      })
    }
  }
});

bot.on('disconnect', function(erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    bot.connect();
});
