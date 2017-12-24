
module.exports = (bot, message) => {

  const weather = bot.props.weather;

  let output = `Currently: ${weather.currently.summary}. ${Math.round(weather.currently.temperature)}°c feels like ${Math.round(weather.currently.apparentTemperature)}°c\n`
  output += `Hourly Forecast: ${weather.hourly.summary}`
  // `Hourly Forecast: ${weather.hourly}`
  message.channel.send(output);
}
