# videoGame
Curso practico crea tu primer videojuego de JavaScript
# talller-practico-javascript-videogames

## Descripción general
Este se divide en 3 archivos:
    *game.js.
    *maps.js.
    *index.html.
**Nota** Tambien hay un archivo de *styles.css* en el que se estilizan los emojis.

### Archvo game.js
Este archivo contiene la lógica del juego, utiliza manejadores de eventos para hacer el código más legible y escalable. 
*Se prefieren siempre los nombres cortos sobre los verbosos para la identificacion de variables*

### Archivo maps.js
Contiene la estructura del juego.
se monta sobre un Array, `maps =[]` vacio al que se le empujan los valores como una cadena que despues de se separa en la logica usando split y otros métodos. 

## CANVAS
La etiqueta canvas con el `id=game` tiene todo el oleo de donde se encuentra el juego.

### Bonus localStorage
se utiliza `localStorage` con sus propiedades 
`.setItem`; `.getItem`; `.removeItem`.

`.setItem`: Guarda la variable como un metodo, pasandolo como primer argumento. El segundo argumento será el valor que se quiera guardar. 

```javascript 
localStorage.setItem('setVar','resultado de esta variable');


// Para leer la información que se guarda:
let resultado = localStorage.getItem('setVar');
console.log(resultado); // Esto imprimirá 'resultado de esta variable' en la consola.
```

