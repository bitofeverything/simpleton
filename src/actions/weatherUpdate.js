import logger from 'winston';
import fetch from 'node-fetch';
import auth from '../../auth.json';
// Setup the logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});

const weatherFetch = () => {

    logger.info("Fetching new weather status");
    let dataSet = [];
    const req = fetch('https://api.darksky.net/forecast/'+ auth.darkSky+ '/43.6630632,-79.3920922?units=ca');

    let response = new Promise((resolve, reject) => {

        req.then((resp) => {
            if(resp.status !== 200){
                reject(resp)
                throw Error(response.statusText)
            }

            return resp.json();
        }).then((json) => {
            // regularWeatherNotice = darkskyWeather(json);
            // weatherJsonObject = json;
            logger.info("Returning Data "+ json.currently.summary);
            resolve([json, json]);
        }).catch((err) => { logger.error(err) })
    });

    return response
}

module.exports = (props) => {
    weatherFetch().then((resp) => {
      logger.info("Response received")
      // logger.info(resp[0]);
      // regularWeatherNotice = resp[0]
      const weatherJsonObject = resp[1]

      props.weather = weatherJsonObject;
    }).catch(err => {logger.error(err)});

}
