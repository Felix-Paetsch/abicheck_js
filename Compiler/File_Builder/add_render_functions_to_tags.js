const ejs = require('ejs');
const get_uid = require("./uid_gen.js");

module.exports = (tags) => {
    tags.forEach(t => {
        // Todo: verify attributes are correct and string attributes count is correct and so on

        t.amt_rendered = 0;
        t.render = (children, attr = [], str_attr = []) => {
            let render_string = t.ejs;
            if (t.amt_rendered == 0){
                if (typeof t.css == "string" && t.css.length > 0){
                    render_string = `<style>${ t.css }</style>` + render_string;
                }
                if (typeof t.js == "string" && t.js.length > 0){
                    render_string = `<script>{\n${ t.js }\n}</script>` + render_string;
                }
            }

            t.amt_rendered += 1;

            return ejs.render(render_string, {
                children,
                attr,
                str_attr,
                get_uid
            }, { async: false });
        }
    });
}