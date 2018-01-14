import fetch from 'node-fetch'

module.exports = (bot, message) => {
    console.log("going to try for a joke)")
    const jokePromise = fetch('https://icanhazdadjoke.com/', {
      'headers':{
        'Accept' : 'application/json',
        'Content-Type':'application/json'},
      'method':'GET'
    })
    jokePromise.then(resp => {
      return resp.json()
    }).then(jbody => {
      console.log(jbody)
      let person = message.author.username;
      message.channel.send(`Alright ${person}, you hear this one? \n "${jbody.joke}"`)
    }).catch(e => {console.error(e)});
}
