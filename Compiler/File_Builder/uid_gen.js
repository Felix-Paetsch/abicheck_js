function* get_uid(){
    let count = 1;
    while (true) {
        yield `uid-${count++}`;
    }
}

module.exports = get_uid();