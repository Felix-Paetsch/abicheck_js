The tokenizer produces the following output:

Attributes
==========
```t
    [
        {
            "name": "tg",
            "value": "Analysis",
            "line": 1
        },
        {
            "name": "author",
            "value": "Felix",
            "line": 2
        },
        {
            "name": "require",
            "value": "css/some_style.css",
            "line": 5
        },
        {
            "name": "require",
            "value": "js/some_js.js",
            "line": 6
        }
    ]
```

Main Area
=========
The main area part is split into several pieces to make it more managable:

### General structure
```json

    {
        "content_sections": [
            {
                "title": {
                    "value": "Die binomischen Formeln",
                    "line": 9
                },
                "content": [
                    // Array of Renderable Elements 
                ]
            },
            {
                "title": {
                    "value": "Quadratische Funktionen",
                    "line": 25
                },
                "content": [
                    // Array of Renderable Elements 
                ]
            },
            // ...
        ],
        "title": {
            "value": "Quadratische Funktionen",
            "line": 8
        }
    }
```

### Renderable Elements
There are the following types of renderable elements:

#### Text
```json
    {
        "type": "TEXT",
        "line": 10,
        "text_sections": [{
            "type": "MD_TEXT",
            "content": {
                "type": "root",
                "children": [
                    // Array of text nodes
                ]
            }
        }, {
            "type": "MULTILINE_TEXT",
            "content": "$$\n    multiline math\n    $$"
        }]
    }
```
You can have arbitrarily many text sections (Currently each text only has one though.)

##### Text nodes
Text nodes look like:
```json
    {
        "type": "text",
        "value": "This is some text with "
    },{
        "type": "bold",
        "children": [
            // Array of text nodes
        ]
    },{
        "type": "text",
        "value": " text and "
    },{
        "type": "italics",
        "children": [
            // Array of text nodes
        ]
    },{
        "type": "link",
        "text": "link",
        "url": "<my_url_format>
    }
```

The style nodes are:
```t
   "bold-italics"
   "bold"
   "italics"
   "underline"
   "strikethrough"
```

#### Tags
```json
    {
        "type": "TAG",
        "line": 14,
        "string_attributes": ["hello", "you"],
        "name": "Beispiel",
        "attributes": [
            {
                "attr_name": "numerated",
                "has_value": false
            },{
                "attr_name": "attribute_name",
                "has_value": true,
                "value": "value"
            }],
        "content": [
            // Array of renderable elements
        ]
    }
```

#### Lists 
```json
    {
        "type": "LIST",
        "line": 16,
        "list_type": "nummerated", // or unnummerated
        "list_items": [{
            "line": 16,
            "type": "LIST_ITEM",
            "list_type": "nummerated", // same us parent.list_type
            "parsed_text": {
                "line": 16,
                "type": "TEXT",
                "text_sections": [
                    // same as text.text_sections
                ]
            }
        }, {
            // as above
        }]
    }
```

#### Embeddings
##### HTML
```json
    {
        "line": 49,
        "text": "<div>This will be inserted as raw html</div>",
        "type": "HTML_EMBEDDING"
    }
```

##### CSS
```json
    {
        "line": 61,
        "text": "/* This will go into css styles*/",
        "type": "CSS_EMBEDDING"
    }
```

##### JS
```json
     {
        "line": 56,
        "text": "//some js",
        "type": "JS_EMBEDDING",
        "dependencies": [
            "<my_url_format>",
            "js_dependency(_group)_name"
        ],
        "options": [
            "onload", // stuff
        ]
    }
```

The options are the following:

```t
    "onload"
```