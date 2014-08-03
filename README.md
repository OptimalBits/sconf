sconf
=====

Simple Configuration for NodeJS Applications.

Why?
====

Because you need a well defined metodology to configure your applications both for
development and deployment instead of reinventing the wheel for every application
or hacking configuration values.

*sconf* follows the twelve-factor app [guidelines](http://www.12factor.net/config).

You should define the application configuration by setting environment variables, 
but you can have convenient defaults for development, testing or some special
development configurations.

All configuration items can be optionally prefixed, to avoid conflict with
other applications that may be running in the same environment.

Installation
============

```
  npm install sconf
```

Examples:
=========

```
  var $ = require('sconf');

  var config = {
    appPort: $('APP_PORT', 8080),
    redisUri: $('REDIS_PORT', 'tcp://example.com:6379'),
  }
  
  //  config.appPort contains 8080 or the value of env.APP_PORT
  
  /*
   config.redisUri:
      redisUri:
         { protocol: 'tcp:',
           slashes: true,
           auth: null,
           host: 'example.com:6379',
           port: '6379',
           hostname: 'example.com',
           hash: null,
           search: null,
           query: null,
           pathname: null,
           path: null,
           href: 'tcp://example.com:6379' }
   */
```

Using prefixes:

```
  // prefixed config
  var config = $.prefix('MY_APP')({
    appPort: $('PORT', 8080),
    redisUri: $('REDIS_URI', 'tcp://example.com:6379'),
  });
  
  // tries to read from environment variables MY_APP_PORT, MY_APP_REDIS_PORT

  // we can extend with an unprefixed config
  $.extend(config, $({mode: $('NODE_ENV')}))  
```

It also supports hierarchies:

```
 var config = $.prefix('MY_APP')({
   appPort: $('PORT', 8080),
   db: $.prefix('DB')({
     redisUri: $('REDIS_URI', 'tcp://example.com:6379');
   })
 })
 
// tries to read from environment variables MY_APP_PORT, MY_APP_DB_REDIS_PORT
```

Best Practices
==============

Use a single config.js file for your application. Export the configuration
and include that file in all the required server files.

```
  // config.js

  var $ = require('sconf');

  module.exports = {
    appPort: $('APP_PORT', 8080),
    redisUri: $('REDIS_PORT', 'tcp://example.com:6379'),
  }
```


API
===

```

  /**
    Creates a configuration entry. 
    
    @params envName Environment variable name
    @params defaultDevelopment optional default value in development mode
    @params defaultTest optional efault value in test mode
    @params defaultProduction optional default value in production mode
    
    @returns a value for this entry. Note, if the value is a valid URL, then
    it gets parsed and a URL object is returned instead.
  */
  $(envName, defaultDevelopment, defaultTest, defaultProduction)
  
  
  /**
    Adds a prefix to the environment variable names.
    
    @returns A sconf object with the given prefix appended to it.
  */
  $.prefix(prefix)
  
  
  /**
    Creates a configuration object based on the current prefix hierarchy.
    
    @param object
    @returns object with all the values populated.
  */
  $(object)
  

```


License
=======

(The MIT License)

Copyright (c) 2013 Manuel Astudillo manuel@optimalbits.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

