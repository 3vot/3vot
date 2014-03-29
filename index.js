var _3vot = {};
_3vot.endpoint = "http://backend.3vot.com/v1";
_3vot.frontpoint = "https://daulau2emlz5i.cloudfront.net";
_3vot.host = _3vot.frontpoint.split("://")[1];
_3vot.loginProviders = {};
_3vot.logins = {};
_3vot.package = {};
_3vot.initOptions = {};
_3vot.utils = require("./utils");

module.exports = _3vot;

var _3votLogin = require("./login");
var _3votDependency = require("./dependency");

_3vot.login = _3votLogin;
_3vot.dependency = _3votDependency;

_3vot.init = function(options){

  _3vot.initOptions = options;
  _3vot.package = options.package
  _3vot.endpoint = options.endpoint || _3vot.endpoint
  _3vot.app = options.app
  
  if(window && !window._3vot) window._3vot = _3vot
  
  if( !options.loginProviders ) return _3vot.app()
  if( options.loginProviders.length == 0 ) return _3vot.app()

  _3votLogin.registerProviders(options.loginProviders);

  _3votLogin.loginWithAllProviders( function(err){
    if(err) return alert("An Error occured trying to login " + err);
    
    _3votDependency.loadDependency( function(err) {
      if(err) return alert("An Error occured trying to load dependencies");
      _3vot.app()
    });

  });
}

