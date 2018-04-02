 const commands = {
  "triggered": [
    {
      "trigger" : "!",
      "actions" : [
        {
          "keyword":"joke",
          "method":"dadJoke"
        },
        {
          "keyword":"weather",
          "method": "printWeather"
        },
        {
          "keyword":"help",
          "method": "outputHelp",
        },
        {
          "keyword":"play",
          "method":"inviteToPlay",
          "args":["game"],
          // "delimitter": "+"
        },
        {
          "keyword":"music",
          "method":"playMusic",
          "args":["videoId"],
          "is_secret":true
        }
      ]
    },
    {
      "trigger":"$",
      "actions": [
        {
          "keyword":"embed",
          "method":"customEmbedTest",
          "is_secret":true
        },
        {
          "keyword":"schedule",
          "delimiter":"+",
          "is_secret":true,
          "method":"raidSchedule",
          "args":["title","time","slots"],
          "validator":"scheduleValidator"
        }
      ]
    }
  ],
  "timed": [
    {
      "name":"Weather Update",
      "interval":1800000,
      "method":"weatherUpdate",
      "property": "weather"
    },
    {
      "name":"Grab Game Library",
      "interval":43200000, // Update every 12 hours. This library is really unlikely to need frequent updates.
      "method":"gameLibrary"
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
