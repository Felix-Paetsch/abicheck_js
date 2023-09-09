module.exports = (line) => {
    let res = {
        line: line.line,
        type: "TEXT",
        text_sections: [] // MATH_EMBEDDING && Text
    };
    
    while (exists(line.tokens[0])){
        if (line.tokens[0].type == "MULTILINE_MATH"){
            res.text_sections.push({
                "type": "MULTILINE_TEXT",
                "content": line.tokens.shift().value
            });
            continue;
        }

        let md_string = "";
        while (exists(line.tokens[0]) && line.tokens[0].value !== "MULTILINE_MATH"){
            md_string += line.tokens.shift().value;
        }

        res.text_sections.push({
            "type": "MD_TEXT",
            "content": parse_markdown_line(md_string)
        });
    }

    return res;
}

function exists(a){
    return typeof a !== "undefined"
}

function parse_markdown_line(text) {
    const stack = [];
    const root = { type: 'root', children: [] };
    let currentNode = root;
    let i = 0;

    while (i < text.length) {
        if (text[i] === '*') {
            if (text[i + 1] === '*' && text[i + 2] === '*') {
                const node = { type: 'bold-italics', children: [] };
                currentNode.children.push(node);
                stack.push(currentNode);
                currentNode = node;
                i += 3;
            } else if (text[i + 1] === '*') {
                const node = { type: 'bold', children: [] };
                currentNode.children.push(node);
                stack.push(currentNode);
                currentNode = node;
                i += 2;
            } else {
                const node = { type: 'italics', children: [] };
                currentNode.children.push(node);
                stack.push(currentNode);
                currentNode = node;
                i++;
            }
        } else if (text[i] === '_') {
            if (text[i + 1] === '_') {
                const node = { type: 'underline', children: [] };
                currentNode.children.push(node);
                stack.push(currentNode);
                currentNode = node;
                i += 2;
            } else {
                i++;
            }
        } else if (text[i] === '~' && text[i + 1] === '~') {
            const node = { type: 'strikethrough', children: [] };
            currentNode.children.push(node);
            stack.push(currentNode);
            currentNode = node;
            i += 2;
        } else if (text[i] === '[') {
            let j = i + 1;
            while (j < text.length && text[j] !== ']') {
                j++;
            }
            const linkText = text.slice(i + 1, j);
            i = j + 1;
            j = i + 1;
            while (j < text.length && text[j] !== ')') {
                j++;
            }
            const linkUrl = text.slice(i + 1, j);
            currentNode.children.push({ type: 'link', text: linkText, url: linkUrl });
            i = j + 1;
        } else {
            let j = i;
            while (j < text.length && !['*', '_', '~', '['].includes(text[j])) {
                j++;
            }
            currentNode.children.push({ type: 'text', value: text.slice(i, j) });
            i = j;
        }

        // Check for closing tags
        while (stack.length && ['*', '_', '~'].includes(text[i])) {
            const topType = currentNode.type;
            if (text[i] === '*' && topType === 'italics') {
                currentNode = stack.pop();
                i++;
            } else if (text[i] === '*' && text[i + 1] === '*' && topType === 'bold') {
                currentNode = stack.pop();
                i += 2;
            } else if (text[i] === '*' && text[i + 1] === '*' && text[i + 2] === '*' && topType === 'bold-italics') {
                currentNode = stack.pop();
                i += 3;
            } else if (text[i] === '_' && text[i + 1] === '_' && topType === 'underline') {
                currentNode = stack.pop();
                i += 2;
            } else if (text[i] === '~' && text[i + 1] === '~' && topType === 'strikethrough') {
                currentNode = stack.pop();
                i += 2;
            } else {
                break;
            }
        }
    }

    return root;
}