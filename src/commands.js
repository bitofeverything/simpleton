 const commands = {
  "triggered": [
    {
      "trigger" : "!",
      "actions" : [
        {
          "keyword":"weather",
          "method": "printWeather"
        },
        {
          "keyword":"help",
          "method": "outputHelp"
        },
        {
          "keyword":"play",
          "method":"inviteToPlay",
          "args":["game"],
          // "delimitter": "+"
        }
      ]
    }
  ],
  "timed": [
    {
      "name":"Weather Update",
      "interval":300000,
      "method":"weatherUpdate",
      "property": "weather"
    }
  ],
  "persistent" : [
    {
      "action":"bawk",
      "method":"bawkBack"
    }
  ]
}

export default commands;
