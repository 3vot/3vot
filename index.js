window = window || { location: { hostname: "3vot.com", protocol: "http" } };

window._3vot = {
  el: null,
  package: {},
  initOptions: {},
  utils: require("./utils"),
  device: "",
  width: "",
  height: "",
  user_name: "",
  unique_query_string: "unique_domain=" + window.location.protocol + window.location.hostname
};

module.exports= init;

function init(package, options){
  if(!options) options = {};
  _3vot.initOptions = options;
  _3vot.package = package;

  _3vot.user_name = package.threevot.user_name;
  _3vot.endpoint= options.endpoint || "http://backend.3vot.com/v1";
  _3vot.frontpoint= options.frontpoint || "http://daulau2emlz5i.cloudfront.net";
  _3vot.domain= ""; //options.domain || "//3vot.com";
  _3vot.path= package.name; //_3vot.domain+"/"+_3vot.user_name+"/"+package.name;
  _3vot.host= _3vot.frontpoint.split("://")[1];
  _3vot.el = document.getElementById('_3vot_' + package.name);
  _3vot.app = package.name;
  loadFile( fileToLoad() );
}

function fileToLoad(){
  var entries = _3vot.package.threevot.entries || _3vot.package.threevot.platforms || _3vot.package.threevot.screens;

  // "screens": {
  //    "0-320" : [ "phone" ],
  //    "320-900": [ "desktop", "laptop" ],
  //    "900-1200" : [ "tablet" ],
  //    "1200-5000" : [ "tablet" ]
  //  }

  var fileToLoad = "index";
  var width = document.documentElement.clientWidth;
  for(entry in entries){
    var borders = entry.split("-");
    if(width > parseInt(borders[0]) && width <= parseInt(borders[1]) ){
      fileToLoad = entries[entry];
    }
  }

  if(!fileToLoad) return console.error("Could not determine a file to load from package.json threevot.screens. 3VOT will load index.js please fix package.json of your app.");
  return fileToLoad;
}

function loadFile(fileToCall){
  if(!fileToCall) return false;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src =  "{3vot}/" + fileToCall + '.js?' + _3vot.unique_query_string;    

  document.getElementsByTagName('head')[0].appendChild(script);

}
