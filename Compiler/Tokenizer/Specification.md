Attributes
==========
These are the allowed tokens:

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
        "type": "EOF",
        "value": ""
    }
```

The attributes should be fully reconstructable from the tokens.

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
        "value": "+"
    }

    TOKEN {
        "type": "TWO_PLUS",
        "value": "++"
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

Current shortcommings: We cannot specify " +" in some circumstances.
Limited in use of //
...
Should fix it when time is due - maybe will never even come up

If a "#" is inside a comment (at the beginning)

Embeddings & Math have to start on their own lines and have nothing after them.