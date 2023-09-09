let state = {}

module.exports = {
    init: (text) => {
        state.text = text;
        state.line = 1;
    },
    new_line: () => {
        state.line += 1;
    },
    get_current_line: () => {
        return state.line;
    },
    n_new_lines: (n) => {
        state.line += n;
    },
    error: (str) => { error_at(str, state.line); },
    error_at,
    throw_at_current_line: () => {
        const current_line = state.line;
        return (str) => {
            error_at(str, current_line);
        }
    }
}

function error_at(str, line) {
    console.error(`\n================================
Error at line: ${ line }

$$ ${ getNthLine(state.text, line) }

${ str }
================================`);
    process.exit();
}

function getNthLine(text, n) {
    const lines = text.split('\n');
    if (n <= lines.length) {
        const line = lines[n - 1];
        if (line.trim() === '') {
            return '[ empty line ]';
        }
        return line;
    } else {
        return '[ eof ]';
    }
}