const tokenise_attributes = require("./attributes.js");
const tokenise_main = require("./tokenise_main.js");

module.exports = (text) => {
    text = text.replace(/\r/g, "");
    const [attr_tokens, main_text] = tokenise_attributes(text);
    const main_tokens = tokenise_main(main_text);

    return [attr_tokens, main_tokens];
}