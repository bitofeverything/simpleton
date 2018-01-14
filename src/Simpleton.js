'use strict';
import Discord, {
  Client
} from 'discord.js';
import camelCase from 'camelcase';
import MapFunctions from './mapper';
const auth = require('../auth.json');

function mapTriggers(arr) {
  console.log('received')
  console.log(arr);
  const triggers = {};

  arr.map(triggerEntry => {
    // { trigger: actions:{arg array, str:methods }}
    Object.keys(triggerEntry.actions).map(actionKey => {
      const action = triggerEntry.actions[actionKey]
      triggers[triggerEntry.trigger + action.keyword] = {
        fn: require('./actions/' + action.method),
        args: action.args
      };
    })

  })
  console.log(triggers);
  return triggers
}

export default class Simpleton extends Client {

  constructor(userConfig) {
    super();

    this.config = {
      'actions': '/actions/',
      'commands': {}
    }
    this.params = {};
    this.props = {}; //Collection of props.

    this._loadConfig(userConfig)
    this.loadActions();
    this.handleMessage = this._handleMessage.bind(this);
    this.parseCommandStructure(this.config.commands) // parse out the commands into functions
    this.connect = () => this.login(auth.discord);
    this.on('message', this.handleMessage);
    this.initializeTimedFunctions = this._initializeTimedFunctions.bind(this);
    this.initializeTimedFunctions();

  }


  _initializeTimedFunctions() {
    Object.keys(this.config.timed).map(evt => {
      const t = this.config.timed[evt];
      t.fn(this.props);
      setInterval(() => {
        t.fn(this.props)
      }, t.interval);
    });
  }

  _handleMessage(message) {
    if (message.author.username !== this.user.username) {
      const {
        persistent,
        triggers
      } = this.config;
      let ranFlag = false;
      for (const t in triggers) {
        if (message.content.toLowerCase().startsWith(t)) {
          console.log("Trigger popped")
          console.log(triggers[t]);
          const args = message.content.split(triggers[t].delimiter).slice(1);
          this.config.triggers[t].validate(this, message, args, this.config.triggers[t].fn);
          ranFlag = true;
          break
        }
      }
      if (!ranFlag) {
        for (const p in persistent) {
          if (this.config.persistent[p].fn(this, message)) {
            break
          }
        }
      }
    }

  }

  _loadConfig(userConfig) { // Mostly good enough for the time being
    const supportedGroups = ['triggered', 'timed', 'persistent'];

    Object.keys(this.config).forEach(k => {
      try {
        if (userConfig[k]) {
          this.config[k] = userConfig[k]
          Object.keys(this.config[k]).forEach(j => {
            if (supportedGroups.indexOf(j) >= 0) { // If the commands are in supported Group
              switch (j) {
                case 'triggered':
                  this.config.triggers = MapFunctions.mapTriggers(this.config[k][j]);
                  break;
                case 'timed':
                  this.config.timed = MapFunctions.mapTimed(this.config[k][j]);
                  break;
                case 'persistent':
                  this.config.persistent = MapFunctions.mapPersistent(this.config[k][j]);
                  break;
                default:
                  console.log(`Don't know function group: ${j}`)
              }
            }
          })
        }
      } catch (e) {
        console.error('Failed to set user configuration option: ' + userConfig[k]);
        console.error(e);
      }
    })
    const temp = this.config.actions.split('/').filter(m => {
      return m !== ""
    });
    this.config.actions = temp.join('/');
  }

  loadActions() {
    const normalizedPath = require("path").resolve(__dirname, this.config.actions);
    const actions = this.config.actions

    require("fs").readdirSync(normalizedPath).forEach(function(file) {
      exports[file.split('.')[0]] = require(["./", actions, file].join('/'));
    })
  }

  parseCommandStructure(commands) {
    Object.keys(commands).forEach(cat => {
      this[camelCase('get_' + cat)] = () => this.config.commands[cat]
    });

  }


}
