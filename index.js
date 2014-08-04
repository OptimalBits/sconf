"use strict";


var
  _ = require('lodash'),
  env = process.env,
  url = require('url'),
  validUrl = require('valid-url');

var nodeMode = env.NODE_ENV;
var contexts = [];

function sconf(conf, development, test, production){
  if(_.isString(conf)){
    var prefix = contexts.join('_');
    var val = env[prefix ? prefix+'_'+conf : conf];
    var extra;
    switch(nodeMode){
      case 'development':
        extra = development;
        break;
      case 'test':
        extra = test;
        break;
      case 'production':
        extra = production
        break;
    }
    val = val || extra || development || test || production || '';
    
    if(_.isString(val) && validUrl.isUri(val)){
      return url.parse(val);
    }else{
      switch(val){
        case 'true': return true;
        case 'false': return false;
        default: return val;
      }
    }
  } else{
    if(contexts.length){
      contexts.pop();
    }
    return conf;
  }
}

sconf.prefix = function(prefix){
  // Push a prefix in the contexts stack.
  contexts.push(prefix);
  return sconf;
}

sconf.extend = _.bind(_.extend, _);

module.exports = sconf;
