node-css
========

simple css generator for node

```js
var css = require("node-css");
var result = css(".test", {color: red, display: block});
console.log(result);
> .test{
>   color: red;
>   display: block;
> }
```
