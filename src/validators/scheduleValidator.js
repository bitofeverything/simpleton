import chrono from 'chrono-node';

module.exports = (bot, message, args, cb) => {
  const argTypes = {'title': 'string','time':'string','slots':'int'}
  const validated = {}
  try{
    validated['title'] = args[0]
    validated['time'] = chrono.parseDate(args[1])
    validated['slots'] = parseInt(args[2])
  }catch(e){
    console.error("Storing validated failed due to :")
    console.error(e);
  }

  return cb(bot, message, validated)
}
