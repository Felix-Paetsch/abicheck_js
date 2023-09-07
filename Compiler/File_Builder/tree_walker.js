function* create_tree_walker(tree) {
    for (const cs of tree.content_sections) {
        yield* tree_walker_process_content_section(cs.content);
    }
    return false;
}

function* tree_walker_process_content_section(content) {
    for (const c of content) {
        if (c.type === "TAG") {
            yield* tree_walker_process_content_section(c.content);
        }
        yield c;
    }
    return false;
}  

module.exports = create_tree_walker