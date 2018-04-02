import fetch from 'node-fetch'
import ytdl from 'ytdl-core'
import fs from 'fs'

module.exports = (bot, message, videoId) => {


  const url = 'https://youtube.com/watch?v=' + videoId

// https://stackoverflow.com/questions/47045805/playing-an-audio-file-using-discord-js-and-ytdl-core
    const voiceChannel = message.member.voiceChannel;

    // console.log(message.guild.me.setDeaf(true, ))

    bot.voiceConnections.map((snowflake, voiceConnection) => {
      console.log(snowflake, voiceConnection)
    })

    if(voiceChannel){

      console.log(Object.keys(bot))
      message.guild.me.setDeaf(false)

      voiceChannel.join()
    .then(connection => {
      if(videoId.length > 0){

        const stream = ytdl(url, {filter: 'audioonly'})
        const dispatcher = connection.playStream(stream, {volume: 0.2})
        dispatcher.on("end", end => {
console.log( "Audio done" )
          message.guild.me.setDeaf(true, 'I have nothing to play')
          // voiceChannel.leave();
        })

      }
    })
    .catch(console.log)
  }else{
    message.reply("If a song is requested, but no one is around to hear it, does it make a sound?")
  }

}
