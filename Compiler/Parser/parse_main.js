let parsed_data = {};
const parse_single_content_lines = require("./parse_single_content_lines.js");
const merge_parsed_content_lines = require("./merge_parsed_content_lines.js");

const line_counter = require("../general/line_counter.js");

module.exports = (tokens) => {
    parsed_data = {
        content_sections: []
    };

    // ensure main area start
    if (tokens[0].type !== "HASHTAG" || tokens[0].amt !== 1){
        line_counter.error("Unexpected main content start:" + JSON.stringify(next_token[0]));
    }

    tokens.shift();

    // get title
    let title = "";
    while (!["ERROR", "EMBEDDED", "NEW_LINE", "EOF"].includes(tokens[0].type)){
        title += tokens.shift().value;
    }

    if (title.trim().length == 0){
        line_counter.error("Title has length 0");
    }

    parsed_data.title = {
        value: title.trim(),
        line: line_counter.get_current_line(),
        error: line_counter.throw_at_current_line()
    }

    if (tokens[0].type == "ERROR"){
        line_counter.error(tokens[0].value);
    }

    while (tokens[0].type !== "EOF"){
        parsed_data.content_sections.push(
            parse_content_section()
        );
    }

    return parsed_data;

    function parse_content_section(){
        const content_section_data = {};

        const title = parse_content_section_title();
        if (title.length == 0){
            line_counter.error("Title has length 0");
        }

        content_section_data.title = {
            value: title,
            line: line_counter.get_current_line(),
            error: line_counter.throw_at_current_line()
        };

        let lines = get_content_lines();
        let parsed_lines = parse_single_content_lines(lines, line_counter);
        let merged_lines = merge_parsed_content_lines(parsed_lines, line_counter);

        content_section_data.content = merged_lines;
        return content_section_data;
    }

    function get_content_lines(){
        // Lines up to, but not including, next content section or EOF
        const lines = [];
        while (!["HASHTAG", "EOF"].includes(tokens[0])){
            const current_line = {
                line: line_counter.get_current_line(),
                error: line_counter.throw_at_current_line(),
                tokens: []
            };
            
            let reached_comment = false;
            while (!["HASHTAG", "EOF", "NEW_LINE"].includes(tokens[0].type)){
                if (tokens[0].type == "ERROR"){
                    line_counter.error(tokens[0].value);
                }
                if (tokens[0].type == "TWO_FORWARD_SLASH"){
                    reached_comment = true;
                }
                const t = tokens.shift();
                if (!reached_comment){
                    current_line.tokens.push(t);
                }
            }

            // # Adjust line counts

            // ## Multiline tokens
            const token_types = current_line.tokens.map(t => t.type);
            if (arraysIntersect(token_types, ["MULTILINE_MATH", "EMBEDDED"])){
                const non_trivial_tokens = current_line.tokens.filter(t => t.type !== "WHITESPACE");
                if (non_trivial_tokens.length > 1){
                    line_counter.error("Multiline math and embeddings should start and end without any other tokens on that line");
                }
                
                const included_line_breaks = non_trivial_tokens[0].value.split("\n").length - 1;
                line_counter.n_new_lines(included_line_breaks);
            }

            // ## Other tokens
            if (tokens[0].type == "NEW_LINE"){
                line_counter.new_line();
                tokens.shift();
            }

            lines.push(current_line);
            if (tokens[0].type == "HASHTAG" || tokens[0].type == "EOF"){
                return lines;
            }
        }
    }

    function parse_content_section_title(){
        while (["WHITESPACE", "TWO_FORWARD_SLASH", "NEW_LINE"].includes(tokens[0].type)){
            if (tokens[0].type == "WHITESPACE"){
                tokens.shift();
                continue;
            }
            if (tokens[0].type == "NEW_LINE"){
                tokens.shift();
                line_counter.new_line();
                continue;
            }

            parse_single_line_comment();
        }

        // Ensure main area start
        if (tokens[0].type !== "HASHTAG" || tokens[0].amt !== 2){
            line_counter.error("Expected `##`, got '" + tokens[0].value + "'");
        }

        // Remove ##
        tokens.shift();

        let title = "";
        while (!["ERROR", "EMBEDDED", "MULTILINE_MATH", "NEW_LINE", "EOF"].includes(tokens[0].type)){
            title += tokens.shift().value;
        }

        if (tokens[0].type == "ERROR"){
            line_counter.error(tokens[0].value);
        }

        if (tokens[0].type == "EMBEDDED"){
            line_counter.error("Embedding should not start in same line as section heading");
        }

        if (tokens[0].type == "MULTILINE_MATH"){
            line_counter.error("Multiline math should not start in same line as section heading");
        }

        return title.trim();
    }

    function parse_single_line_comment(){
        while (tokens[0].type !== "NEW_LINE"){
            tokens.shift();
        }
    }
}

function arraysIntersect(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}