// This will manipulate the lines, mainly given it new additional attributes

const js_embedding_options = ["onload"];
const parse_text = require("./parse_text_line.js");

module.exports = (lines) => {
    const parsed_lines = [];

    for (const line of lines){
        const res = parse_single_content_line(line);
        if (res !== null){
            parsed_lines.push(res);
        }
    }

    return parsed_lines;

    function parse_single_content_line(line){
        while (typeof line.tokens[0] !== "undefined" && line.tokens[0].type === "WHITESPACE"){
            line.tokens.shift();
        }

        if (line.tokens.length == 0) return null;

        if (line.tokens[0].type == "GREATER_THAN") return parse_tag_start(line);
        if (line.tokens[0].type == "LESS_THAN") return parse_tag_end(line);

        if ((line.tokens[0].type == "MINUS" || line.tokens[0].type == "STAR") && exists(line.tokens[1]) && line.tokens[1].type == "WHITESPACE" && line.tokens[0].amt == 1){
            return parse_list_item(line);
        }

        if (line.tokens[0].type == "EMBEDDED") return parse_embedded(line);
        
        // Rest, Catch All
        return parse_text(line);
    }

    function parse_tag_start(line){
        const res = { 
            line: line.line,
            error: line.error,
            type: "TAG_START",
            amt: line.tokens[0].amt,
            string_attributes: []
        };

        line.tokens.shift();
        
        while (typeof line.tokens[0] !== "undefined" && line.tokens[0].type === "WHITESPACE"){
            line.tokens.shift();
        }

        let name_token = line.tokens.shift();
        if (!exists(name_token) || name_token.type !== "TEXT"){
            line.error("Exptected tag name");
        }

        res.tag_name = name_token.value;

        if (exists(line.tokens[0]) && line.tokens[0].type !== "WHITESPACE"){
            line.error("Expected whitespace after tag name");
        }

        // Collect attributes
        let attribute_token_lists = [];
        while (exists(line.tokens[0]) && line.tokens[0].type !== "MINUS"){
            while (exists(line.tokens[0]) && line.tokens[0].type === "WHITESPACE"){
                line.tokens.shift();
            }

            let attr_str = "";
            let beginning_of_attr = true;
            while (exists(line.tokens[0]) && line.tokens[0].type !== "WHITESPACE" && (line.tokens[0].type !== "MINUS" || !beginning_of_attr)){
                // e.g. stars and / and // should be contained
                attr_str += line.tokens.shift().value;
                beginning_of_attr = false;
            }

            if (attr_str.length > 0){
                attribute_token_lists.push(attr_str);
            }
        }

        res.attributes = attribute_token_lists.map(tl => parse_attribute_token_list(tl, line.ling));
        
        if (!exists(line.tokens[0])){
            return res;
        }

        const string_attr_sep_count = line.tokens.shift().amt;

        while (exists(line.tokens[0])){
            // Directly after "---"
            let current_str_attr = "";
            while (exists(line.tokens[0]) && (line.tokens[0].type !== "MINUS" || line.tokens.amt < string_attr_sep_count)){
                current_str_attr += line.tokens.shift().value;
            }
            
            res.string_attributes.push(current_str_attr.trim());

            if (exists(line.tokens[0])){
                const sep_token = line.tokens.shift();
                if (sep_token.amt > string_attr_sep_count){
                    line.error("String attribute seperator ist longer than first one");
                }
            }
        }

        return res;
    }

    function parse_tag_end(line){
        return {
            line: line.line,
            error: line.error,
            type: "TAG_END",
            amt: line.tokens[0].amt
        };
    }

    function parse_list_item(line){
        const first_token = line.tokens.shift();
        let list_type;
        if (first_token.type == "MINUS"){
            list_type = "nummerated";
        } else {
            list_type = "unnummerated";
        }

        // Remove whitespace
        while (exists(line.tokens[0]) && line.tokens[0].type == "WHITESPACE"){
            line.tokens.shift();
        }

        return {
            line: line.line,
            error: line.error,
            type: "LIST_ITEM",
            list_type,
            parsed_text: parse_text(line) // The first tokens are already removed
        };
    }

    function parse_embedded(line){
        let res = {
            line: line.line,
            error: line.error
        }

        // First line: data, Rest: content
        let string = line.tokens[0].value.substring(3, line.tokens[0].value.length - 3);
        let [meta_data, content] = string.split("\n");
        meta_data = meta_data.trim();
        content = content.trim();

        if (!exists(content) || content.length == 0){
            line.error("No content in embedding");
        }
        res.text = content;

        let meta_data_words = meta_data.split(" ").filter(x => x.length > 0);
        const embedding_type = meta_data_words.shift();
        if (!exists(embedding_type) || embedding_type == ""){
            line.error("No embedding type specified");
        }
        if (embedding_type.toUpperCase() == "CSS"){
            res.type = "CSS_EMBEDDING";
            return res;
        } if (embedding_type.toUpperCase() == "HTML"){
            res.type = "HTML_EMBEDDING";
            return res;
        } else if (embedding_type.toUpperCase() == "JS"){
            res.type = "JS_EMBEDDING";
        } else {
            line.error("No valid embedding type: '" + embedding_type + "'");
        }

        // We have js
        let split_into_options_and_dependencies = split_by_condition(meta_data_words, (w) => {
            return js_embedding_options.includes(w);
        });

        res.dependencies = split_into_options_and_dependencies.not_meeting_condition;
        res.options = split_into_options_and_dependencies.meeting_condition;

        return res;
    }

    function parse_attribute_token_list(attr_str, _line){
        let res = {
            attr_name: "",
            has_value: false
        };
        
        while (attr_str.length > 0 && attr_str[0] !== ":"){
            res.attr_name += attr_str[0];
            attr_str = attr_str.slice(1);
        }

        res.attr_name = res.attr_name.trim();
        if (attr_str.length == 0) { return res; }

        res.has_value = true;
        res.value = "";
        while (attr_str.length > 0 && attr_str[0] === ":"){
            attr_str = attr_str.slice(1);
        }

        while (attr_str.length > 0 && attr_str[0] !== ":"){
            res.value += attr_str[0];
            attr_str = attr_str.slice(1);
        }

        return res;
    }
}

function exists(a){
    return typeof a !== "undefined"
}


function split_by_condition(array, conditionFunction) {
  return array.reduce((result, item) => {
    if (conditionFunction(item)) {
      result.meeting_condition.push(item);
    } else {
      result.not_meeting_condition.push(item);
    }
    return result;
  }, { meeting_condition: [], not_meeting_condition: [] });
}