const logic = {};

function setupValidator(action){
  if(action.validator){
    return require('./validators/'+action.validator)
  }else{
    return function (bot, message, args, cb){ return cb(bot, message, args ) };
  }
}

class MapFunctions{

  // idea being, ingest commands and setup the initial mapping for everything
  static mapTriggers(arr){
    const triggers = {};

    arr.map(triggerEntry => {
      // { trigger: actions:{arg array, str:methods }}
      Object.keys(triggerEntry.actions).map(actionKey => {
        const action = triggerEntry.actions[actionKey]
        triggers[triggerEntry.trigger+action.keyword] = {
          fn:require('./actions/'+action.method),
          validate: setupValidator(action),
          args:action.args,
          is_secret:action.is_secret?true:false,
          delimiter:action.delimiter?action.delimiter:' '
        };
      })

    })
    return triggers
  }

  static mapPersistent(arr){
    const persistent = {}
    arr.map(persistentEntry => {
      // name, method.
      persistent[persistentEntry.action] = {fn:require('./actions/'+persistentEntry.method)}
    })

    console.log(persistent);
    return persistent;
  }

  static mapTimed(arr){
    const timed = {};

    arr.map(timedEntry => {
      // name, interval, method.
      timed[timedEntry.name] = {fn:require('./actions/'+timedEntry.method),interval:parseInt(timedEntry.interval)}
    })

    console.log(timed);
    return timed;

  }

}

export default MapFunctions;
