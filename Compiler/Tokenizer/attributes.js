const data = {};

module.exports = (text) => {
    data.tokens = [];
    data.text   = text;    

    while (data.text.length > 0){
        let next_token = get_next_char_token();

        while (["WHITESPACE", "PLUS", "TEXT", "FORWARD_SLASH"].includes(next_token.type) && data.text.length > 0) {
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

    return [data.tokens, ""]
}

function get_next_char_token(){
    const firstChar = data.text[0];
    data.text = data.text.slice(1);

    switch (firstChar) {
        case "[":
            return token("OPEN_BRACKET", "[");
        case "]":
            return token("CLOSING_BRACKET", "]");
        case "\n":
            return token("NEW_LINE", "\n");
        case "/":
            return token("FORWARD_SLASH", "/");
        case ":":
            return token("COLON", ":");
        case "#":
            data.text = "#" + data.text;
            return token("END_ATTRIBUTES", "");
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

    if (t1.type === "FORWARD_SLASH"){
        return token("TWO_FORWARD_SLASH", t1.value + t2.value);
    }
}

function token(type, value){
    return {
        type,
        value
    }
}