const create_tree_walker = require("./tree_walker.js");
const template_data = require("./get_template_data.js");
const ejs = require("ejs");

module.exports = (tree) => {
    const walker = create_tree_walker(tree);
    for (const node of walker){
        if (node.type == "TEXT"){
            node.render_self = () => { 
                return `<p class="text_section">${ 
                    node.text_sections.map(t => render_text_section(t)).join("\n")
                }</p>`};
        } else if (node.type == "LIST"){
            node.render_self = () => {return ejs.render(
                template_data.std_tags.list,
                {
                    ...node,
                    get_uid: require("./uid_gen.js")
                }, { async: false }
            );}
        } else if (node.type == "HTML_EMBEDDING") {
            node.render_self = () => {
                return node.text;
            }
        } else if (node.type == "JS_EMBEDDING") {
            node.render_self = () => {
                return `<script>{\n${ node.text }\n}</script>`;
            }
        } else if (node.type == "CSS_EMBEDDING") {
            node.render_self = () => {
                return `<style>${ node.text }</style>`;
            }
        } else if (node.type == "TAG") {
            const tag = template_data.tags.filter(x => {
                return x.meta_data.name.toLowerCase() == node.name.toLowerCase();
            })[0];

            node.render_self = () => {
                return tag.render(node.content, node.attributes, node.string_attributes)
            }
        } else {
            console.log("N:", node);
        }
    }
}

function render_text_section(t){
    if (t.type == "MD_TEXT"){
        return t.content.children.map(c => render_md_text(c)).join("");
    } else {
        console.log("render text::", t);
    }
}

function render_md_text(c){
    if (c.type == "text") return c.value;
    if (c.type == "bold") return `<b>${
        c.children.map(x => render_md_text(x)).join("")
    }</b>`;
    if (c.type == "italics") return `<i>${
        c.children.map(x => render_md_text(x)).join("")
    }</i>`;
    if (c.type == "strikethrough") return `<s>${
        c.children.map(x => render_md_text(x)).join("")
    }</s>`;
    if (c.type == "underline") return `<u>${
        c.children.map(x => render_md_text(x)).join("")
    }</u>`;
    if (c.type == "bold-italics") return `<b><i>${
        c.children.map(x => render_md_text(x)).join("")
    }</b></i>`;
    throw new Error("Unexpected text token:", c-type);
}