'use strict';
import fetch from 'node-fetch';
import logger from 'winston';

var auth = require('../auth.json');

export const nyeh = (m) => {
  var chars = m.toLowerCase().split("");
  var bawks = 'bAwK '.repeat(Math.floor((Math.random()*5)+1))
  var bangs = "!!!!".repeat(2*(Math.floor(Math.random()*4)+1))
  for (var i =0; i < chars.length; i += 2) {
    chars[i] = chars[i].toUpperCase();
  }
  return bawks+ chars.join("")+bangs;
}


const darkskyWeather = (j) => {
  const currentSum = j.currently.summary + ' | ' + j.currently.temperature;
  return currentSum
}

export const say = (message) => {

}

export const weatherFetch = () => {

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
            resolve([darkskyWeather(json), json]);
        }).catch((err) => { logger.error(err) })
    });

    return response
}
