"use strict";

// Input: text (maybe config)
// Output: rendered article

const tokenize = require("./Tokenizer/main.js");
const parse = require("./Parser/main.js");
const build = require("./File_Builder/main.js");

module.exports = (text) => {
    const line_counter = require("./general/line_counter.js");
    line_counter.init(text);
            
    const [attr_tokens, main_tokens] = tokenize(text);
    const [attributes, main_tree] = parse(attr_tokens, main_tokens);
    
    return {
        rendered_content: build(attributes, main_tree),
        attributes
    }
}