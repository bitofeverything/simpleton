
module.exports = (bot, message, game) => {
  console.log(game);
  const currGame = message.author.presence.game
  if (game.args.length ===0 && !currGame){
    message.channel.send(`Hey ${message.author.username} you either need to name a game or be playing a game that I can see.`);
  }else if(game){
    const gamename = game.args.join(" ");
    message.channel.send("@everyone - "+message.author.username+" Wants to play some: "+gamename);
  }else{
    message.channel.send("@everyone - "+message.author.username+" wants you to play "+currGame.name);
  }
}
