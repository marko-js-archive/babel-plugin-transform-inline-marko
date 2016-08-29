var marko_createInlineTemplate = require("marko/runtime/inline"),
    __markoHelpers = require("marko/runtime/helpers"),
    marko_escapeXml = __markoHelpers.x;
var name = 'Frank';
var x = marko_createInlineTemplate(__filename, function (data, out) {
  out.w("<div></div>");
});
var y = marko_createInlineTemplate(__filename, function (data, out) {
  out.w("<div>" + marko_escapeXml(name) + "</div>");
});