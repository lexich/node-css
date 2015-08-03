[![Build Status](https://travis-ci.org/lexich/node-css.svg)](https://travis-ci.org/lexich/node-css)
node-css
========

simple css generator for node

```js
var css = require("node-css");
var result = css(".test", {color: "red", display: "block"});
console.log(result);
```
Output
```sh
.test {
  color: red;
  display: block;
}
```
