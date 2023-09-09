"use strict";
// Currently we just build all files, maybe this can change later with configs

const fs = require('fs');
const path = require('path');


// Delete rendered articles
deleteDirectoryContents(path.join(__dirname, '../', 'BuildTarget'));
deleteDirectoryContents(path.join(__dirname, '../', 'Server', "views", "articles", "rendered_articles")); 

// Delete article imports from server
deleteDirectoryContents(path.join(__dirname, '../', 'Server', "public", "article_dependencies")); 

const inputFolder = path.join(__dirname, '../', 'Articles');
const buildFolderA = path.join(__dirname, '../', 'BuildTarget');
const buildFolderB = path.join(__dirname, '../', 'Server', "views", "articles", "rendered_articles");

// Render .md files
const inputFiles = fs.readdirSync(inputFolder);
for (const file of inputFiles) {
    if (path.extname(file) === '.md') {
        const fileContent = fs.readFileSync(path.join(inputFolder, file), 'utf-8').replace(/\r/g, "");
        
        const { rendered_content, attributes } = require("./compile.js")(fileContent);

        fs.writeFileSync(
            path.join(buildFolderA, file.replace('.md', '.ejs')),
            rendered_content
        );
        
        fs.writeFileSync(
            path.join(buildFolderB, file.replace('.md', '.ejs')),
            rendered_content
        );
    }
}

// Create Server/views/articles/articles.json
// @todo

// Copy JS and CSS dependencies from template
const cssDependenciesSource = path.join(__dirname, '../Templates/css_dependencies');
const jsDependenciesSource = path.join(__dirname, '../Templates/js_dependencies');
const destination = path.join(__dirname, '../Server/public/article_dependencies');
copyFiles(cssDependenciesSource, destination);
copyFiles(jsDependenciesSource, destination);

function copyFiles(source, destination){
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    // Read all files and directories in the source directory
    const items = fs.readdirSync(source);

    items.forEach(item => {
        const sourcePath = path.join(source, item);
        const destinationPath = path.join(destination, item);

        // Check if it's a directory
        const stat = fs.statSync(sourcePath);
        if (stat.isDirectory()) {
            // Create a new directory in the destination
            fs.mkdirSync(destinationPath);
            // Recursive call to copy files in the current directory
            copyFiles(sourcePath, destinationPath);
        } else {
            // Simply copy the file
            fs.copyFileSync(sourcePath, destinationPath);
        }
    });
};

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