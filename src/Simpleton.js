'use strict';
import discord from 'discord.io';
import camelCase from 'camelcase';
const auth = require('../auth.json');


export default class Simpleton {

  constructor(userConfig) {
    // Initialize the bot.
    // const bot = new discord.Client({
    //   token: auth.discord,
    //   autorun: true
    // });
    this.config = {
      'actions':'/actions/',
      'commands':{}
    }
    this.loadConfig(userConfig)
    this.parseCommandStructure(this.config.commands) // parse out the commands into functions
  }

  loadConfig(userConfig){ // Mostly good enough for the time being
    Object.keys(this.config).forEach(k => {
      try{
          if(userConfig[k]){
      	   this.config[k] = userConfig[k]
         }
       }catch(e){
         console.error('Failed to set user configuration option: '+userConfig[k]);
       }
    })
    const temp =  this.config.actions.split('/').filter(m => { return m !== ""});
    this.config.actions = temp.join('/');
  }

  loadActions(){
    const normalizedPath = require("path").resolve(__dirname, this.config.actions);
    const actions = this.config.actions

    require("fs").readdirSync(normalizedPath).forEach(function(file) {
        exports[file.split('.')[0]] = require(["./", actions, file].join('/'));
    })
  }

  parseCommandStructure(commands) {
    Object.keys(commands).forEach(cat => {
      this[camelCase('get_'+cat)] = () => this.config.commands[cat]
    });

  }


}
