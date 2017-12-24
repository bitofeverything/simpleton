const logic = {};

class MapFunctions{

  // idea being, ingest commands and setup the initial mapping for everything
  static mapTriggers(arr){
    const triggers = {};

    arr.map(triggerEntry => {
      // { trigger: actions:{arg array, str:methods }}
      Object.keys(triggerEntry.actions).map(actionKey => {
        const action = triggerEntry.actions[actionKey]
        triggers[triggerEntry.trigger+action.keyword] = {fn:require('./actions/'+action.method),args:action.args};
      })

    })
    console.log(triggers);
    return triggers
  }

  static mapPersistent(arr){
    console.log("In persistence - Received");
    console.log(arr)
    const persistent = {}
    arr.map(persistentEntry => {
      // name, method.
      persistent[persistentEntry.name] = {fn:require('./actions/'+persistentEntry.method)}
    })

    console.log(persistent);
    return persistent;
  }

  static mapTimed(arr){
    console.log("In timed - Received");
    console.log(arr)
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
