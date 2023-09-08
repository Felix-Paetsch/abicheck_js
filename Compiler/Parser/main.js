const parse_attr = require("./parse_attr.js");
const parse_main = require("./parse_main.js");

module.exports = (attr_tokens, main_tokens) => {
    const attr_parsed = parse_attr(attr_tokens, line_counter);
    const main_parse = parse_main(main_tokens, line_counter);
    return [attr_parsed, main_parse]
}