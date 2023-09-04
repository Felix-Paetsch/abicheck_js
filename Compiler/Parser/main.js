const parse_attr = require("./parse_attr.js");
const line_counter = require("../line_counter.js");
const parse_main = require("./parse_main.js");

module.exports = (text, attr_tokens, main_tokens) => {
    line_counter.init(text);
    const attr_parsed = parse_attr(attr_tokens, line_counter);
    const main_parse = parse_main(main_tokens, line_counter);
    return [attr_parsed, main_parse]
}