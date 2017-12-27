import fetch from 'node-fetch';
import auth from '../../auth.json';

module.exports = (props) => {
  const queryUrl = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key="+auth.steam+"format=json"
  const gamelib = []
  const badwords = new RegExp(/(trailer|server|soundtrack|movie|OVA|demo|preorders| app |dlc|down ?loadable ?content|gamemaker|gameguru|sdk|beta|client|theatrical|subtitled|720p|1080p)/,'i')
  // const badwords = new RegExp(/ZDFSDAFAz/)
  const battleNetNameInserts = ["Overwatch","World of Warcraft","Diablo III","Destiny 2","Starcraft 2","Hearthstone","Heroes of the Storm"]

  fetch(queryUrl).then((resp)=>{
    return resp.json()
  }).then((jsonBody)=>{
    gamelib.push(...jsonBody.applist.apps);
    battleNetNameInserts.forEach(game => gamelib.push({"appid":-1,"name":game})); //Set APP id to invalid steam value. differentiator for user-added games.
    const filtered = gamelib.filter(entry => {
      if(entry.name.indexOf(entry.appid)>=0){
        return false // If the App ID is in the game name, probably not a game we're ever intending to look for
      }else if(entry.appid >= 753 && entry.appid <= 854){
        return false //These are steam apps. (Videos, user logs, greenlight etc)
      }
       return !badwords.test(entry.name)
     })
    console.log(filtered.length)
    console.log(gamelib.length)
    props.games = filtered; // Fill that game list up
  }).catch(err => console.error(err));
}
