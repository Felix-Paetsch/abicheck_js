# Abt
This is the specification for the component design.

Each component will have a seperate folder. In the folder are to be placed the following files:

## *.json
This file should like so:

```json
    {
        "name": "Expandbox",
        "attr": [],              // default []
        "children": [],          // default []
        "string_attributes": 0,  // default 0
        "requirements": {
            "js": [],            // Paths to js files (http or relative to base)
            "css": [],           // Paths to css files (http or relative to base)
            "raw": []            // Things to just include as is in head
        }                      // default: as seen here
    }
```

### attributes
All attributes should be lowercase.
There are three kinds of attributes:

#### flags
For flags, just put a string with the flag name. Alternatively you can use an object with a description:

```json
    {
        "attr": ["colorfull", {
            "name": "colorfull",
            "descr": "Does the following thing.." // default null
        }]
    }
```

#### enums
For enums use an object like:

```json
{
    "attr": [{
        "name": "colorfull",
        "options": ["color-yes", "color-no"]
    }]
}
```

#### values
An attribute with a value attr:value:

```json
{
    "attr": [{
        "name": "colorfull",
        "options": ["value"]
    }]
}
```

Values cant be null.

#### general
In general you can also have - as mentioned earlier - the `desr` attribute and the `required` key to put inro options:

```json
{
    "attr": [{
        "name": "colorfull",
        "options": ["value", "required"]
    }]
}
```

### children
All things in subfolders will be viewed as children. If you want to register additional children, just specify a filepath relativ to your folder (not files!).

### string attributes
A component can have string attributes - seperated by "-" or "--". Specify the amount (default 0). If it is variable, you can use an array:

```json
{
    "string_attributes": [3, "inf"] // Use "inf", "infinity" for infinity. -inf will never be needed
    // At lest 3 attributes
}
```

## *.ejs
Here you implement the component in ejs. You will have access to some data in your component:
- `attributes`: The attributes you specified. How exactly you get their value we will see later.
- `children`: All the children elements for you (you will somehow be able to distinguish between own children and not own children && if own children -> pass values(?!))
- `parent_attr`: ??
- `get_new_id`: A function to return a unique id

// Rendering the children first or the parent first??

## *.css
The stylings for the component. Try to keep the classes of you components so that there will be no dublications.