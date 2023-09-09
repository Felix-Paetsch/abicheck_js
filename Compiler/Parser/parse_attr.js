let attributes = [];
const line_counter = require("../line_counter.js"); // Needed mainly bcs it know the text

module.exports = (tokens) => {
    attributes = [];

    while (tokens.length > 0){
        if (tokens[0].type === "TWO_FORWARD_SLASH"){
            parse_single_line_comment();
            continue;
        }

        if (tokens[0].type === "OPEN_BRACKET"){
            parse_attr();
            continue;
        }

        if (tokens[0].type === "EOF"){
            line_counter.error("Unexpected end of file. Expected the main area.")
            continue;
        }

        if (tokens[0].type === "END_ATTRIBUTES"){
            break;
        }

        if (tokens[0].type === "WHITESPACE"){
            tokens.shift();
            continue;
        }

        if (tokens[0].type === "NEW_LINE"){
            tokens.shift();
            line_counter.new_line();
            continue;
        }

        throw new Error("INTERNAL: Unexpected token!", tokens[0].type);
    }

    return attributes;

    function parse_single_line_comment(){
        while (tokens[0].type !== "NEW_LINE"){
            tokens.shift();
        }
    }

    function parse_attr(){
        let current_token = tokens.shift();
        if (current_token.type !== "OPEN_BRACKET"){
            line_counter.error("Expected '[', got '" + current_token.value + "'");
        }

        let attr_name = "";
        while (["TEXT", "WHITESPACE"].includes(tokens[0].type)){
            attr_name += tokens.shift().value;
        }

        if (tokens[0].type !== "COLON"){
            line_counter.error("Expected ':', got '" + tokens[0].value + "'");
        }

        while (tokens[0].type == "COLON"){
            tokens.shift();
        }

        let attr_value = "";
        while (["TEXT", "WHITESPACE", "FORWARD_SLASH", "TWO_FARWARD_SLASH"].includes(tokens[0].type)){
            attr_value += tokens.shift().value;
        }

        current_token = tokens.shift();
        if (current_token.type !== "CLOSING_BRACKET"){
            line_counter.error("Expected ']', got '" + current_token.value + "'");
        }

        attributes.push({
            name: attr_name.trim(),
            value: attr_value.trim(),
            line: line_counter.get_current_line(),
            error: line_counter.throw_at_current_line()
        });
    }
}