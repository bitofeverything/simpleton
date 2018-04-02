import fetch from 'node-fetch'
import ytdl from 'ytdl-core'
import fs from 'fs'

module.exports = (bot, message, videoId) => {


  const url = 'https://youtube.com/watch?v=' + videoId

// https://stackoverflow.com/questions/47045805/playing-an-audio-file-using-discord-js-and-ytdl-core
    const voiceChannel = message.member.voiceChannel;

    if(voiceChannel){
      voiceChannel.join()
    .then(connection => {
      if(videoId.length > 0){

        const stream = ytdl(url, {filter: 'audioonly'})
        const dispatcher = connection.playStream(stream, )
        dispatcher.on("end", end => {
          voiceChannel.leave();
        })

      }
    })
    .catch(console.log)
  }else{
    message.reply("If a song is requested, but no one is around to hear it, does it make a sound?")
  }

    // const videoFetch = fetch('https://icanhazdadjoke.com/', {
    //   'headers':{
    //     'Accept' : 'application/json',
    //     'Content-Type':'application/json'},
    //   'method':'GET'
    // })
    // jokePromise.then(resp => {
    //   return resp.json()
    // }).then(jbody => {
    //   console.log(jbody)
    //   let person = message.author.username;
    //   message.channel.send(`Alright ${person}, you hear this one? \n "${jbody.joke}"`)
    // }).catch(e => {console.error(e)});
}
