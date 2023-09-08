The tokenizer produces the following tokens:

Attributes
==========
These are the allowed tokens for the attributes section:

```t
    TOKEN {
        "type":  "OPEN_BRACKET",
        "value": "["
    }

    TOKEN {
        "type":  "CLOSING_BRACKET",
        "value": "]"
    }

    TOKEN {
        "type":  "TEXT",
        "value": "abc",
    }

    TOKEN {
        "type":  "NEW_LINE",
        "value": "\n"
    }

    TOKEN {
        "type": "COLON",
        "value": ":"
    }

    TOKEN {
        "type": "FORWARD_SLASH",
        "value": "/"
    }

    TOKEN {
        "type": "TWO_FORWARD_SLASH",
        "value": "//"
    }

    TOKEN {
        "type": "END_ATTRIBUTES",
        "value": ""
    }

    TOKEN {
        "type": "WHITESPACE",
        "value": " "
    }

    TOKEN {
        "type": "ERROR",
        "value": "Value of Error"
    }

    TOKEN {
        "type": "EOF",
        "value": ""
    }
```

The attributes are fully reconstructable from the tokens values.

Main Area
=========

```t
    TOKEN {
        "type": "HASHTAG",
        "value": "###",
        "amt": 3
    }

    TOKEN {
        "type": "TEXT",
        "value": "abc"
    }

    TOKEN {
        "type": "WHITESPACE",
        "value": " "
    }

    TOKEN {
        "type": "NEW_LINE",
        "value": "\n"
    }

    TOKEN {
        "type": "LESS_THAN",
        "value": "<",
        "amt": 3
    }

    TOKEN {
        "type": "FORWARD_SLASH",
        "value": "/"
    }

    TOKEN {
        "type": "TWO_FORWARD_SLASH",
        "value": "//"
    }

    TOKEN {
        "type": "GREATER_THAN",
        "value": ">>>",
        "amt": 3
    }

    TOKEN {
        "type": "PLUS",
        "value": "+",
        "amt": 2
    }

    TOKEN {
        "type": "MINUS",
        "value": "--",
        "amt": 3
    }

    TOKEN {
        "type": "STAR",
        "value": "*",
        "amt": 3
    }

    TOKEN {
        "type": "EMBEDDED",
        "value": "````html abc some stuff```"
    }

    TOKEN {
        "type": "MULTILINE_MATH",
        "value": "$$ some stuff $$"
    }

    TOKEN {
        "type": "ERROR",
        "value": "Value of Error"
    }
```