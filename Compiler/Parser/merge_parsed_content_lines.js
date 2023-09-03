module.exports = (parsed_lines, line_counter) => {
    let res = parse_from_indent(0);
    return res;

    function parse_from_indent(indent){
        let res = []; // Children of parent

        // a) we done
        if (parsed_lines.length == 0) return res;

        // b) tag start
        if (parsed_lines[0].type == "TAG_START"){
            if (parsed_lines[0].amt > indent){
                const l = parsed_lines.shift();
                return [{
                    type: "TAG",
                    line: l.line,
                    string_attributes: l.string_attributes,
                    name: l.tag_name,
                    attributes: l.attributes,
                    content: parse_from_indent(l.amt)
                }].concat(parse_from_indent(indent));
            } else {
                return [];
            }
        }

        // c) tag end
        if (parsed_lines[0].type == "TAG_END"){
            if (parsed_lines[0].amt <= indent){
                const l = parsed_lines.shift();
                return [];
            } else {
                line_counter.error_at("Opening tag not found", parsed_lines[0].line);
            }
        }

        // d) text
        if (parsed_lines[0].type == "TEXT"){
            const l = parsed_lines.shift();
            return [{
                type: "TEXT",
                line: l.line,
                text_sections: l.text_sections
            }].concat(parse_from_indent(indent)); 
        }

        // e) list
        if (parsed_lines[0].type == "LIST_ITEM"){
            return [{
                type: "LIST",
                line: parsed_lines[0].line,
                list_type: parsed_lines[0].list_type,
                list_items: parse_list_items(parsed_lines[0].list_type)
            }].concat(parse_from_indent(indent)); 
        }

        // f) embeddings
        if (["HTML_EMBEDDING", "JS_EMBEDDING", "CSS_EMBEDDING"].includes(parsed_lines[0].type)){
            return [
                parsed_lines.shift()
            ].concat(parse_from_indent(indent)); 
        }

        throw new Error("Line: " + JSON.stringify(parsed_lines[0], true, 2) + "\nCould not be merged.");
    }

    function parse_list_items(list_type){
        let res = [];
        while (parsed_lines.length > 0 && parsed_lines[0].type == "LIST_ITEM" && parsed_lines[0].list_type == list_type){
            res.push(parsed_lines.shift());
        }
        return res;
    }
}