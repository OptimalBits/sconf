sconf
=====

Simple Configuration for NodeJS Applications.

Follows the twelve-factor app [guidelines](http://www.12factor.net/config).

You should define the application configuration by setting environment variables, 
but you can have convenient defaults for development, testing or some special
development configurations.

All configuration items can be optionally prefixed, to avoid conflict with
other applications that may be running in the same environment.

```
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
  
  // tries to read from environement variables MY_APP_PORT, MY_APP_REDIS_PORT

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
 
// tries to read from environement variables MY_APP_PORT, MY_APP_DB_REDIS_PORT
```




