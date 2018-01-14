module.exports = (bot, message, ...args) => {
  const schedules = bot.props.schedules;
  const { time, slots, title } = args;
  console.info("Going to schedule a raid");
  console.info(args);
  console.info("received: " + time);
  console.info("received: " + title);
  console.info("received: " + slots);
}
