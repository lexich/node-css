/* global describe, it */
/* jshint expr: true */
"use strict";

var css = require("../");
require("chai").should();

describe("test extend", function() {
  it("test extend update object", function() {
    var opt = {a: 1, b: 2};
    var opt1 = css.extend(opt, {c: 3});
    opt.should.eql(opt1);
    opt.should.eql(
      {a: 1, b: 2, c: 3}
    );
    (opt === opt1).should.be.ok;
  });
  it("test extend create new object", function() {
    var opt = {a: 1, b: 2};
    var opt1 = css.extend({c: 3}, opt);
    (opt === opt1).should.not.be.ok;
    opt.should.eql(
      {a: 1, b: 2}
    );
    opt1.should.eql(
      {a: 1, b: 2, c: 3}
    );
  });
  it("text extend multiple arguments", function() {
    var opt = css.extend({a: 1}, {b: 2}, {c: 3});
    opt.should.eql({a: 1, b: 2, c: 3});
  });
});

describe("test CSS", function() {
  var c = new css.CSS();
  it("test default _options", function() {
    c._options.should.eql({indent: "  "});
  });
  it("test options method", function() {
    c.options(null, "indent").should.eql("  ");
    c.options(null, "indent", "*").should.eql("  ");
    c.options({indent: "*"}, "indent").should.eql("*");
    c.options({indent: "*"}, "indent", "$").should.eql("*");
    c.options(null, "test", "hello").should.eql("hello");
  });
  it("test body method", function() {
    var res = c.body({
      color: "red",
      display: "block",
      "margin-left": "10px"
    });
    res.should.eql("  color: red;\n  display: block;\n  margin-left: 10px;\n");
    var res1 = c.body({
      color: "red",
      display: "block",
      "margin-left": "10px"
    }, {indent: "\t"});
    res1.should.eql("\tcolor: red;\n\tdisplay: block;\n\tmargin-left: 10px;\n");
  });
  it("test statement method", function() {
    var res = c.statement(".test", {color: "red", display: "block"});
    res.should.eql(".test {\n  color: red;\n  display: block;\n}\n");
  });
});

describe("test defauult api", function() {
  it("test default api with media query", function() {
    var res = css(".test", {color: "red", display: "block"}, {media: "(min-width: 100px)"});
    res.should.eql("@media (min-width: 100px) {\n  .test {\n    color: red;\n    display: block;\n  }\n}\n");
  });
});
