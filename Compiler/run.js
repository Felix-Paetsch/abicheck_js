"use strict";

const fs = require('fs');
const path = require('path');

const tokenize = require("./Tokenizer/main.js");
const parse = require("./Parser/main.js");
const build = require("./File_Builder/main.js");

// Delete contents of a directory
function deleteDirectoryContents(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            deleteDirectoryContents(filePath);
            fs.rmdirSync(filePath);
        } else {
            fs.unlinkSync(filePath);
        }
    }
}

// Delete contents of Tokens and Tree
deleteDirectoryContents(path.join(__dirname, 'Test', 'Tokens'));
deleteDirectoryContents(path.join(__dirname, 'Test', 'Tree'));
deleteDirectoryContents(path.join(__dirname, 'Test', 'Output'));

// Process .md files in Testing/Input
const inputFolder = path.join(__dirname, 'Test', 'Input');
const tokensFolder = path.join(__dirname, 'Test', 'Tokens');
const treeFolder = path.join(__dirname, 'Test', 'Tree');
const buildFolder = path.join(__dirname, 'Test', 'Output');

const inputFiles = fs.readdirSync(inputFolder);
for (const file of inputFiles) {
    if (path.extname(file) === '.md') {
        const fileContent = fs.readFileSync(path.join(inputFolder, file), 'utf-8').replace(/\r/g, "");
        const [attr_tokens, main_tokens] = tokenize(fileContent);
        
        fs.writeFileSync(
            path.join(tokensFolder, "attr" + file.replace('.md', '.json')),
            JSON.stringify(attr_tokens, true, 2)
        );

        fs.writeFileSync(
            path.join(tokensFolder, "main" + file.replace('.md', '.json')),
            JSON.stringify(main_tokens, true, 2)
        );

        const [attributes, main_tree] = parse(fileContent, attr_tokens, main_tokens);

        fs.writeFileSync(
            path.join(treeFolder, "attr" + file.replace('.md', '.json')),
            JSON.stringify(attributes, true, 2)
        );

        fs.writeFileSync(
            path.join(treeFolder, "main" + file.replace('.md', '.json')),
            JSON.stringify(main_tree, true, 2)
        );
        
        const build_string = build(attributes, main_tree)

        fs.writeFileSync(
            path.join(buildFolder, file.replace('.md', '.ejs')),
            build_string
        );
    }
}