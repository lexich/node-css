"use strict";

function extend(/* args */) {
  var opts = arguments[0];
  var params;
  for (var i = 1; i < arguments.length; i++) {
    if (params = arguments[i]) {
      for (var key in params) {
        opts[key] = params[key];
      }
    }
  }
  return opts;
}

function CSS() {
  this._options = { indent: "  " };
}

CSS.prototype.options = function(options, name, defval) {
  return (!!options && options[name]) || this._options[name] || defval;
};

CSS.prototype.body = function(params, options) {
  var body = "";
  var indent = this.options(options, "indent", "  ");
  for (var name in params) {
    body += indent + name + ": " + params[name] + ";\n";
  }
  return body;
};

CSS.prototype.statement = function(selector, params, options) {
  var media = this.options(options, "media");
  var statement = "";
  var indent = this.options(options, "indent");
  if (media) {
    statement += "@media " + media + " {\n" + indent;
    options = extend({ indent: indent + indent }, options);
  }
  statement += "" + selector + " {\n" + this.body(params, options);
  if (media) {
    statement += indent + "}\n}\n";
  } else {
    statement += "}\n";
  }
  return statement;
};
var defaultCSS;
module.exports = function(selector, params, options) {
  return (defaultCSS || (defaultCSS = new CSS())).statement(selector, params, options);
};
module.exports.extend = extend;
module.exports.CSS = CSS;
