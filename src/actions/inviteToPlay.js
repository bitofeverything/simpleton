import Fuse from 'fuse.js';
import fetch from 'node-fetch';

async function validatedAppRequest(gameEntry) {
  const req = await fetch("http://store.steampowered.com/api/appdetails?appids=" + gameEntry.appid)
  const resp = await req.json()
  return resp
}

async function handleMatch(message, results){
  for(var i = 0; i < results.length; i++){
    const match = results[i];
    if(match.appid > 0){
    const json = await validatedAppRequest(match);
    if (json[match.appid].success) {
      if (json[match.appid].data.type === 'game') {
        const gameJsonData = json[match.appid].data;
        // Its a game!
        message.channel.send("@everyone - " + message.author.username + " Wants to play some: " + match.name);
        message.channel.send("It's a "+gameJsonData.genres[0].description +" game."+
        (!gameJsonData.is_free?" Currently on Steam for $"+gameJsonData.price_overview.final/100:" It's free to play on Steam"));
        break;
      }
    }
  } else {
    message.channel.send("@everyone - " + message.author.username + " Wants to play some: " + match.name);
    break;
  }
  }
}

module.exports = (bot, message, game) => {

  const fuzzOptions = {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name"
    ]
  };
  const currGame = message.author.presence.game
  if (game.args.length === 0 && !currGame) {
    message.channel.send(`Hey ${message.author.username} you either need to name a game or be playing a game that I can see.`);
  } else if (game) {
    const gamename = game.args.join(" ");
    const fuse = new Fuse(bot.props.games, fuzzOptions); // "list" is the item array
    const result = fuse.search(gamename);

    // const match = result.length > 0 ? result[0] : null
    if (result.length > 0) {
      handleMatch(message, result);
    } else {
      message.author.send("Hey "+ message.author.username+", I don't know what game that is.");
    }


  } else {
    message.channel.send("@everyone - " + message.author.username + " wants you to play " + currGame.name);
  }
}
