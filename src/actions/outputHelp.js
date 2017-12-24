
module.exports = (bot, message, {args}) =>  {
  const triggers = bot.config.triggers;
  const persistent = bot.config.persistent;
  let reply = "Simpleton Chat Bot\n"
  reply += "Weather is Powered by Dark Sky (https://darksky.net/poweredby/)"
  reply += "Available triggers are: \n"
  Object.keys(triggers).map(t=>{
    reply+= `${t} - ${triggers[t].args?triggers[t].args.join(", "):"No arguments"}`
    if(Object.keys(triggers).indexOf(t) < Object.keys(triggers).length){
      reply+='\n';
    }
  })
  message.channel.send(reply)
}
