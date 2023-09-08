const data = {};
let max_operations = 10000;

module.exports = (text) => {
    data.tokens = [];
    data.text   = text;    

    while (data.text.length > 0){
        guard_max_operations();

        let next_token = get_next_char_token();

        while (data.text.length > 0 && next_token !== null) {
            guard_max_operations();

            let next_char_token = get_next_char_token();
            let merge_token = try_merge_tokens(next_token, next_char_token);
            
            if (merge_token === null) { 
                data.text = next_char_token.value + data.text;
                break;
            } else {
                next_token = merge_token;
            } 
        }
        

        data.tokens.push(next_token);
        if (next_token.type == "END_ATTRIBUTES") return [data.tokens, data.text]
    }

    data.tokens.push(token("EOF", "EOF"))

    return data.tokens
}

function get_next_char_token(){
    const firstChar = data.text[0];
    data.text = data.text.slice(1);

    switch (firstChar) {
        case "#":
            return token("HASHTAG", "#", {amt: 1});
        case "\n":
            return token("NEW_LINE", "\n");
        case "<":
            return token("LESS_THAN", "<", {amt: 1});
        case ">":
            return token("GREATER_THAN", ">", {amt: 1});
        case "+":
            return token("PLUS", "+");
        case "-":
            return token("MINUS", "-", {amt: 1});
        case "/":
            return token("FORWARD_SLASH", "/");
        case "*":
            return token("STAR", "*", {amt: 1});
        case "`":
            data.text = "`" + data.text;
            return parse_possible_embedded();
        case "$":
            data.text = "$" + data.text;
            return parse_possible_multiline_math();
        default:
            if (firstChar.trim() === ""){
                return token("WHITESPACE", firstChar);
            } else {
                return token("TEXT", firstChar);
            }
    }
}

function try_merge_tokens(t1, t2){
    if (t1.type !== t2.type) return null;

    if ([
        "TEXT", 
        "WHITESPACE", 
    ].includes(t1.type)){
        return token(t1.type, t1.value + t2.value);
    }
    
    if ([
        "HASHTAG",
        "LESS_THAN",
        "GREATER_THAN",
        "STAR",
        "PLUS"
    ].includes(t1.type)){
        return token(t1.type, t1.value + t2.value, {
            amt: t1.amt + t2.amt
        })
    }

    if (t1.type === "COLON"){
        return token("TWO_COLON", t1.value + t2.value);
    }

    if (t1.type === "FORWARD_SLASH"){
        return token("TWO_FORWARD_SLASH", t1.value + t2.value);
    }

    return null;
}

function parse_possible_embedded() {
    if (data.text.slice(0, 3) !== "```") {
        data.text = data.text.slice(1);
        return token("TEXT", "`");
    }

    // Search up to next ```
    let endIndex = data.text.indexOf("```", 3);  // Start searching after the first ```

    if (endIndex !== -1) {
        let token_text = data.text.slice(0, endIndex + 3);  // Include the closing ```
        data.text = data.text.slice(endIndex + 3);  // Remove the embedded section from data.text
        return token("EMBEDDED", token_text);
    } else {
        return token("ERROR", "Embedding doesn't close");
    }
}

function parse_possible_multiline_math(){
    if (data.text.slice(0, 2) !== "$$") {
        data.text = data.text.slice(1);
        return token("TEXT", "$");
    }

    let endIndex = data.text.indexOf("$$", 2);
    if (endIndex !== -1) {
        let token_text = data.text.slice(0, endIndex + 2);
        data.text = data.text.slice(endIndex + 2);
        return token("MULTILINE_MATH", token_text);
    } else {
        return token("ERROR", "Multiline math doesn't close");
    }
}

function token(type, value, additional_data = {}){
    return {
        type,
        value,
        ...additional_data
    }
}

function guard_max_operations(){
    max_operations--;
    if (max_operations < 0) throw new Error("To many operations!");
}