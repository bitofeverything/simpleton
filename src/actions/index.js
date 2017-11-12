'use strict';

var normalizedPath = require("path").join(__dirname);

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  exports[file.split('.')[0]] = require("./" + file);
});
