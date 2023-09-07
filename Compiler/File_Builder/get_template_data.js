// Load tags And (possible) Dependencies
const fs = require('fs');
const path = require('path');

const js_template_fp = '../Templates/js_dependencies/dependency_map.json';
const jsonData = fs.readFileSync(js_template_fp, 'utf-8');
const js_dependencies = JSON.parse(jsonData);

const css_template_fp = '../Templates/css_dependencies/dependency_map.json';
const cssData = fs.readFileSync(css_template_fp, 'utf-8');
const css_dependencies = JSON.parse(cssData);

const tagsArray = [];

function processtagFolder(folderPath) {
    const folderContents = fs.readdirSync(folderPath);

    let tagObject = {
        meta_data: null,
        css: null,
        js: null,
        ejs: null
    };

    for (const item of folderContents) {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
        const ext = path.extname(item).toLowerCase();

        if (ext === '.json') {
            tagObject.meta_data = JSON.parse(fs.readFileSync(itemPath, 'utf-8'));
        } else if (ext === '.css') {
            tagObject.css = fs.readFileSync(itemPath, 'utf-8');
        } else if (ext === '.js') {
            tagObject.js = fs.readFileSync(itemPath, 'utf-8');
        } else if (ext === '.ejs') {
            tagObject.ejs = fs.readFileSync(itemPath, 'utf-8');
        }
    } else if (stats.isDirectory()) {
        processtagFolder(itemPath);
    }
    }

    // Check if ejs property is null, and throw an error if necessary
    if (tagObject.meta_data) {
        if (tagObject.ejs === null){
            throw new Error(`Missing EJS file in folder: ${folderPath}`);
        } else {
            tagsArray.push(tagObject)
        }
    }
}

const tagsRootFolder = '../Templates/tags';
processtagFolder(tagsRootFolder);

module.exports = {
    tags: tagsArray,
    js_dependencies,
    css_dependencies,
    std_tags: {
        "list": fs.readFileSync('../Templates/std_tags/list.ejs', 'utf-8')
    }
}