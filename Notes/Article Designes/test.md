[tg:Analysis]
[author:Felix]
[require:css/some_style.css] // Could maybe even be automaticcally be included if it is found during parsing and compiling
[require:js/some_js.js]

# Quadratische Funktionen
## Die binomischen Formeln
Beim Rechnen mit quadratischen Funktionen muss man oft Summen oder Differenzen wie zum Beispiel (x+3) quadrieren. Dabei helfen sehr oft die drei binomischen Formeln:

> Expandbox numerated other attributes attribute_name::value
>> Item - The Items title
    __Beweis:__
    Some string
    >>> Beispiel
        - Liste nummerated
        * List unnumerated
    <<< End Beispiel
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


[tg:Analysis]
[author:Felix]
[require:css/some_style.css]
[require:js/some_js.js]

# Quadratische Funktionen

## Die binomischen Formeln
Beim Rechnen mit quadratischen Funktionen muss man oft Summen oder Differenzen wie zum Beispiel (x+3) quadrieren. Dabei helfen sehr oft die drei binomischen Formeln:

] Expandbox numerated
]] Item - The Items title (In this case it is short for Expandbox::Item)
    E.g. Std::Item, Parent::Item

    __Beweis:__

]]] Beispiel
    - Liste nummerated
    * List unnumerated

] New thing


[Some link text](Link)


*italic*
_italic_ 

**bold**
__underline__

***italic bold***
~~strikethrough~~