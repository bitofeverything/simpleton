# Simpleton Discord bot

Entirely a toy application to learn a bit about chat bots.

## Setup instructions:

* Make sure [yarn](https://yarnpkg.com/) is installed
* Clone the repo to your machine.
* Run the following:
 1. `cd simpleton`
 2. `yarn`
 3. `yarn start`

## Usage

Define a commands.js file in the ./src folder.

```js
const commands = {
 "triggered": [
   {
     "trigger" : "!",
     "actions" : [
       {
         "keyword":"play",
         "method":"inviteToPlay",
         "args":["game"]
       },
       ...
     ]
   }
 ],
 "timed": [
   {
     "name":"Weather Update",
     "interval":300000,
     "method":"weatherUpdate"
   }
 ],
 "persistent" : [
   {
     "action":"bawk",
     "method":"bawkBack"
   }
 ]
}
```

The three categories, `triggered`,`timed`,`persistent` are incorporated into Simpleton.

For each block defined, create an export in the actions folder.



#### triggered export example:
```js
module.exports = (bot, message) => {
  message.channel.send("Hey, thanks for running that command.");
}
```

Every triggered and persistent function will get passed an instance of the bot and the message object it received.

Timed functions will receive the `bot.props` object where you can add a property key to store data you may refer to in trigger or persistent functions.

#### timed exports example:
```js
module.exports = (props) => {
  props.weather = {} // Some JSON body of the weather you may choose to parse later.
}
```

Boilerplate from [Tutorial: Creating a Simple Discord Bot by Renemari Padillo  (@renesansz)](https://medium.com/@renesansz/tutorial-creating-a-simple-discord-bot-9465a2764dc0)

Built with [discord.js](https://discord.js.org/)
