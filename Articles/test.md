[tg:Analysis]
[author:Felix]

// Hello
[require:css/some_style.css] // It's me
[require:js/some_js.js]

# Quadratische Funktionen
## Die binomischen Formeln
This is some text with **strong** text and *cursive* text and ***strong cursive text*** this is ~~strike through~~

Beim Rechnen mit quadratischen Funktionen muss man oft Summen oder Differenzen wie zum Beispiel (x+3) quadrieren. Dabei helfen sehr oft die drei binomischen Formeln:

> Expandbox numerated other attributes attribute_name::value
>> Item attr:value - The Items title
    __Beweis:__
    Some string
    >>> Beispiel
        - Liste nummerated
        - Element 2
        - Element 3
        * List unnumerated
    <<< (End Beispiel, this text is a comment or ignored, it would be nice to have this (probably), but no need to force it -> just have it be nice character)
    $$
    multiline math
    $$
    Wieder im Item
< End Expandbox

Jetzt kann ich hier nämlich weiter schreiben

```html
    <div>This will be inserted as raw html</div>
```

How to do custom js snippets?

Option1:
```js dependency
    // There is some global variable with meta data and such i can access even in {} blocks
    graph_func(abc) // Inserts the html element here (and also returns it)
```

```css
    /* This will go into css styles*/
    .hello{

    }
```

```js
    console.log("This will go into {} script tags");
```