module.exports = (bot, m) => {
  var chars = m.toLowerCase().split("");
  var bawks = 'bAwK '.repeat(Math.floor((Math.random()*5)+1))
  var bangs = "!!!!".repeat(2*(Math.floor(Math.random()*4)+1))
  for (var i =0; i < chars.length; i += 2) {
    chars[i] = chars[i].toUpperCase();
  }
  return bawks+ chars.join("")+bangs;
}
