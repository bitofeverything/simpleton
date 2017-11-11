

export const commands = {
  "triggerable": [
    {
      "trigger" : "!",
      "actions" : [
        {
          "tkeyword":"weather",
          "method":printWeather,
          "interval":300000,
          "intervalFunction":weatherUpdate
        },
        {
          "keyword":"help",
          "method":outputHelp
        },
        {
          "keyword":"play",
          "arg":"game"
        }
      ]
    }
  ],
  "timed": [

  ],
  "persistent" : [
    {
      "action":"bawk",
      "method":bawkBack,
    }
  ]
}
