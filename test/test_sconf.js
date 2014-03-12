"use strict";

var $ = require('../');

var config = $.prefix('MY_APP')({
  port: $('PORT', 8000),
  db: $.prefix('DB')({
    redisUri: $('REDIS_PORT', 'tcp://example.com:6379'),
    mongoUri: $('MONGODB_URI', 'mongodb://localhost/ground')
  })
});

$.extend(config, $({mode: $('NODE_ENV')}))

console.log(config);
