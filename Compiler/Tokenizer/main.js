const tokenise_attributes = require("./attributes.js");
const tokenise_main = require("./tokenise_main.js");
const line_counter = require("../line_counter.js");

module.exports = (text) => {
    text = text.replace(/\r/g, "");
    line_counter.init(text);
    const [attr_tokens, main_text] = tokenise_attributes(text);
    const main_tokens = tokenise_main(main_text);

    return [attr_tokens, main_tokens];
}