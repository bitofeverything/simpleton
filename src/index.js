'use strict';
import logger from 'winston';
import { weatherFetch, nyeh } from './helpers';
import Simpleton from './Simpleton';
import commands from './commands';

// Setup the logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});

const simpleton = new Simpleton({commands})

simpleton.loadActions();

var weatherJsonObject = {}
var regularWeatherNotice = 'The weather has not been updated yet.';

var weatherUpdate = () => {
  // weatherFetch().then((resp) => {
  //   logger.info("Response received")
  //   logger.info(resp[0]);
  //   regularWeatherNotice = resp[0]
  //   weatherJsonObject = resp[1]
  // });
};

logger.info(simpleton.getTriggered())

setInterval( weatherUpdate, 300000);

// const commands = (user, userID, channelID, message, evt) => {
//
//   var args = message.substring(1).split(' ');
//   var cmd = args[0].toLowerCase();
//   args = args.splice(1);
//
//   switch(cmd){
//       case 'weather':
//           bot.sendMessage({
//               to: channelID,
//               message: regularWeatherNotice
//           })
//   }
// }

simpleton.on('ready', function(evt) {
  weatherUpdate();
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(simpleton.user.username + ' - ' + simpleton.user.id);
  logger.info("These are the channels I know about")
  // logger.info(simpleton.channels);
  simpleton.channels.map(c => {

    logger.info(c.name + " : \t\t\t" + c.id);
  });
});


simpleton.connect();

//
// simpleton.on('message', function(user, userID, channelID, message, evt) {
//
//   if (message.substring(0, 1) == '!') {
//     commands(user, userID, channelID, message, evt);
//   }else if(!user.startsWith('simpleton')){
//     // This gets silly
//     let ranNum = Math.random() * 100
//     if( ranNum > 80) { // If it's 1/3rd of the time
//       simpleton.sendMessage({
//         to: channelID,
//         message: nyeh(message)
//       })
//     }
//   }
// });
//
// simpleton.on('disconnect', function(erMsg, code) {
//     console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
//     simpleton.connect();
// });
