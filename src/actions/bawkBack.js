module.exports = (bot, m) => {
  const odds = Math.random(100);
  console.log("Randomly got "+odds);
  if(odds > .94){
    var chars = m.content.toLowerCase().split("");
    var bawks = 'bAwK '.repeat(Math.floor((Math.random()*5)+1))
    var bangs = "!!!!".repeat(2*(Math.floor(Math.random()*4)+1))
    for (var i =0; i < chars.length; i += 2) {
      chars[i] = chars[i].toUpperCase();
    }
    m.channel.send(bawks+ chars.join("")+bangs)
    return bawks+ chars.join("")+bangs;
  }
  return false;
}
