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

logger.info(simpleton.getTriggered())

simpleton.on('ready', function(evt) {
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
