const template_data = require("./get_template_data.js");

const line_counter = require("../line_counter.js"); // Needed mainly bcs it know the text
const create_tree_walker = require("./tree_walker.js");

const ejs = require('ejs');
const fs = require('fs');

module.exports = (attr, tree) => {
    // Has to be done once per file
    require("./add_render_functions_to_tags.js")(template_data.tags);
    require("./add_render_to_tree.js")(tree);

    // returns the string and some attributes (e.g. tg)
    // All references should be relative to the 
    // - css dep if ends with .css
    // - js dep if end with .js
    // - unchanged if starts with http
    // - base_dir if starts with $
    
    /*
        todo: 
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
        get_uid: require("./uid_gen.js")
    }, { async: false });

    return renderedTemplate;


    function evaluate_requirements(req_list){
        const [js_requirements, css_requirements] = [[], []];
        
        for (let r of req_list){
            if (r.value.endsWith(".css")){
                css_requirements.push(to_absolute_path(r.value));
            } else if (r.value.endsWith(".js")){
                js_requirements.push(to_absolute_path(r.value));
            } else {
                const js_dep = template_data.js_dependencies[r.value];
                const css_dep = template_data.css_dependencies[r.value];
                
                let one_exists = false;
                if (typeof js_dep !== "undefined"){
                    one_exists = true;
                    if (typeof js_dep == "string"){
                        js_requirements.push(to_absolute_path(js_dep));
                    } else {
                        js_requirements.push(
                            js_dep.map(x => to_absolute_path(x))
                        );
                    }
                }
                if (typeof css_dep !== "undefined"){
                    one_exists = true;
                    if (typeof css_dep == "string"){
                        css_requirements.push(to_absolute_path(css_dep));
                    } else {
                        css_requirements.push(
                            css_dep.map(x => to_absolute_path(x))
                        );
                    }
                }
                if (!one_exists){
                    line_counter.error_at(`Dependency: '${ r.value }' does not exist`, r.line);
                }
            }
        }

        return [js_requirements, css_requirements];

        function to_absolute_path(r){
            // console.log(r);
            return r;
        }
    }

    function get_tag_specific_requirements(){
        const req = [];

        const walker = create_tree_walker(tree);
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
}