const template_data = require("./get_template_data.js");
const line_counter = require("../line_counter.js"); // Needed mainly bcs it know the text

const ejs = require('ejs');
const fs = require('fs');

module.exports = (attr, tree) => {
    // returns the string and some attributes (e.g. tg)
    // All references should be relative to the 
    // - css dep if ends with .css
    // - js dep if end with .js
    // - unchanged if starts with http
    // - base_dir if starts with $
    
    /*
        todo: 
        a) parse all js and css requirements from require and from the content sections
        b) go through each template data obj and give it a render method
        c) go through each tree content thingy and give it a render_self method 
    */

    const templatePath = '../Templates/article_templates/website_article.ejs';

    const attr_requirements = attr.filter(x => x.name == "require");
    attr_requirements.forEach(x => x.name = "require_dependency");

    const content_requirements = get_tag_specific_requirements();
    const total_req = attr_requirements.concat(content_requirements);
    const [js_requirements, css_requirements] = evaluate_requirements(total_req);

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const renderedTemplate = ejs.render(templateContent, {
        template_data,
        attr,
        tree,
        js_requirements,
        css_requirements,
        throw_error_at: line_counter.error_at,
        get_uid: get_uid()
    }, { async: false });

    return renderedTemplate;


    function evaluate_requirements(req_list){
        // If it ends with css -> to css
        // If it end with js -> to js
        // If neither -> get css and js dep
        //          if not possible: throw error
        // Loop through both and replace with correct prefix
        console.log(req_list);
        return [[],[]];
    }

    function get_tag_specific_requirements(){
        const req = [];

        const walker = create_tree_walker();
        for (const node of walker){
            if (typeof node.dependencies !== "undefined"){
                req.push(...node.dependencies.map(d => {
                    return {
                        value: d,
                        line: node.line,
                        name: "specified_dependency"
                    }
                }));
            }

            if (node.type == "TAG"){
                const template = get_tag_template_for_node(node);
                req.push(...template.meta_data.requirements.map(d => {
                    return {
                        value: d,
                        line: node.line,
                        name: "tag_dependency"
                    }
                }));
                console.log();
            }
        }
        return req;
    }

    function get_tag_template_for_node(node){
        let res = template_data.tags.filter(t => t.meta_data.name.toLowerCase() == node.name.toLowerCase())[0];
        if (typeof res == "undefined") {
            line_counter.error_at("Undefined tag", node.line);
        }
        return res;
    }

    function* create_tree_walker() {
        for (const cs of tree.content_sections) {
            yield* tree_walker_process_content_section(cs.content);
        }
        return false;
    }
    
    function* tree_walker_process_content_section(content) {
        for (const c of content) {
            if (c.type === "TAG") {
                yield* tree_walker_process_content_section(c.content);
            } else {
                yield c;
            }
        }
        return false;
    }    
}

function* get_uid(){
    let count = 1;
    while (true) {
        yield `uid-${count++}`;
    }
}