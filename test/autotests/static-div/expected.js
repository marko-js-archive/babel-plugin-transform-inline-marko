var marko_createInlineTemplate = require("marko/runtime/inline");
var x = marko_createInlineTemplate(__filename, function (data, out) {
  out.w("<div></div>");
});