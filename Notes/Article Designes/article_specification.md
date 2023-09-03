# Abt
This is the specification for the article design from the user perspective. I will go through each section step by step. The "#" sections in this document have to happen in this order, the rest is up to the user if not otherwise specified.

# Meta Data
You specify stuff in this area as so:

```
    [tg:Analysis]
    [author:Felix]
    [require:css/some_style.css]
    [require:js/some_js.js]
```

There are two things to specify here:

### A: Attributes
Attributes might be used as Meta Data or a way to connect files together and similar things. There are currently the following attributes one can specify manually:

```md
    [tg:Analysis]
    [sub:Was+sind+Funktionen?]

    [author:Felix+Pätsch]
    [creation_date:2023-08-30]
```

The first two are mandatory. When building this project they are used to stitch the files together. (?)
Note that "+" and " " are the same. If you really want "+" you can write "++".
Attribute names and values will be trimmed.

### B: Instructions
Instructions for the compiler what to do. Usually import js or css. You specify it as so:

```
    [require:css/some_style.css]
    [require:js/some_js.js]
``` 

Where the path is either relative to "/" or absolute. If one cannot infer the file type by ending, you can also do:

```
    [require-css:css/some_style.css]
    [require-js :js/some_js.js]
``` 

Attribute names and values will be trimmed.

# Main Area

You have to start by specifying the title. This is the title displayed in the page and in any reference outside of the article:

```md
    # Quadratische Funktionen
```

Then for each content section you have to make a subheading:

```md
    ## Die binomischen Formeln
```

Please do not numerate them. This will be done automatically. The first subheading is expected directly after the heading.

## Content sections

Inside the content sections the normal text will be converted into <p></p>. And new lines will be converted into <br />.

### Components
You specify components as follows:

```md
    > ComponentName attr1 attr2 attr3:value - string_value
        stuff
    < End ComponentName
```

Where ComponentName is selfexplanatory, has to start with uppercase letter. Attributes are either boolean (present or not present) or have a value `attr:value`.
Some components have a spring associated to them. This happens after "-". If there are multiple stings, use multiple "-". If the strings include "-" use "--" to seperate string. (And so on.)

After each component you can end it and go to the scope of the parent component with `End ComponentName`. Here you have to have the same level of indent "<<" as ">>".
Another option is to start a components with less or equal indent. (Or a new content section).

Inside components you can have more components. Some are custom to the parent. You inherit the namespace. If there is ambiguity however you may use `NthParentComponentName::Item` or `Global::Item`. 

All components should be designed that they could in theory have any children.

### Text Modification
#### Highlighting
*italic*
_italic_ 

**bold**
__underline__

***italic bold***
~~strikethrough~~

#### Links
This is you can make a link:

```md
    [Some link text](/abc.js)
```

The link should be either:

```md
    [absolute](https://bla)
    [relative](/css/custom.css)
    [tg](tg:Analysis)
    [sub](sub:Analysis::Funktionen)
    [article](a:Analysis::Funktionen::Was+sind+Funktionen?)
```

### HTML
You can insert html at a position via:

```html
    <div>This will be inserted as raw html</div>
```

### CSS
You can insert CSS at a position (preferably very bottom via:)


```css
    .hello{

    }
```

This usually is nice im compination with custom HTML

### JS
#### Normal insertion
You can insert JS at any position via

```js
    console.log("a");
```

This js will be wrapped inside a {}.

#### Global object
There is a file-global object you can access to help you work. It is called `js_data`. It have some attributes preset, namely the following:

```js
    js_data = {
        "attributes": {
            "tg": "Analysis" // the attributes specified at top
            // ...
        }
    }
```

#### Dependency insertion
If you want special functionality, e.g. for graphs, you can use the following syntax:

```js <dependency>
    graph_func(abc)
```

Here `<dependency>` should be replaced with the dependency. Dependencies are ","-seperated. It is nice to see which dependencies you are using. Although you will sadly not be in the namespace, since then i would have to parse js..
They are mainly important to tell which dependencies to include (e.g. to make sure we have the right functions exposed.)
The main appeal of this is that it can insert html at that position.