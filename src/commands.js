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
          "arg":"game"
        }
      ]
    }
  ],
  "timed": [
    {
      "name":"Weather Update",
      "interval":300000,
      "method":'weatherUpdate'
    }
  ],
  "persistent" : [
    {
      "action":"bawk",
      "method":'bawkBack',
    }
  ]
}

export default commands;
