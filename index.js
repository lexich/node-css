"use strict";

function extend(options){
  var opts = arguments[0];
  var params;
  for(var i = 1; i < arguments.length; i++){
    if(params = arguments[i]){
      for(var key in params){
        opts[key] = params[key];
      }
    }
  }
  return opts;
}


function CSS(){
  this._options = {
    indent: "  "
  };
}

CSS.prototype.options = function(options, name, defval){
  return (!!options && options[name]) || this._options[name] || defval;
};

CSS.prototype.body = function(params, options){
  var body = "";
  var indent = this.options(options, "indent", "  ");
  for(var name in params){
    var value = params[name];
    body += indent + name + ": " + params[name] + ";\n";
  }
  return body;
};

CSS.prototype.statement = function(selector, params, options){
  var media = this.options(options, "media");
  var statement = "";
  if(media){
    statement += "@media " + media + " {\n";
    var indent = this.options(options, "indent");
    options = extend({ indent: indent + indent }, options);
  }
  statement = "" + selector + " {\n" + this.body(params, options) + "}\n";
  if(media){
    statement += "}\n";
  }
  return statement;
};

module.exports.CSS = CSS;
