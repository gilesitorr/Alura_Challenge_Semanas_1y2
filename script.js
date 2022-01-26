/* Para "estandarizar" el texto, quitando mayúsculas y
caracteres especiales */
function estandarizarTexto(mensaje){
    // Primero se quitan las mayúsculas
    var resultado = mensaje.toLowerCase();

    // Luego se quitan los acentos
    // Fuente: https://www.codegrepper.com/code-examples/javascript/how+to+remove+accent+marks+in+string+typescript
    return resultado.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    // NOTA: El modificador "g" en la expresión regular hace que el reemplazo
    // se aplique a todas las coincidencias encontradas y no sólo a la primera
}


/* Reglas de encriptación: 
"e" es convertido para "enter" 
"i" es convertido para "imes"
"a" es convertido para "ai"
"o" es convertido para "ober"
"u" es convertido para "ufat"
Solo letras minusculas
No se permite acentuación de palabras 
*/
function encriptar(mensaje){
    // Se hacen los reemplazos necesarios en diferentes líneas para evitar
    // que el comando sea demasiado largo, pero bien podría ser una sola línea
    var resultado = mensaje.replace(/e/g, "enter").replace(/i/g, "imes");
    return resultado.replace(/a/g, "ai").replace(/o/g, "ober").replace(/u/g, "ufat");
    // NOTA: El modificador "g" en la expresión regular hace que el reemplazo
    // se aplique a todas las coincidencias encontradas y no sólo a la primera
}


/* Reglas de desencriptación: 
"enter" es convertido para "e" 
"imes" es convertido para "i"
"ai" es convertido para "a"
"ober" es convertido para "o"
"ufat" es convertido para "u"
Solo letras minusculas
No se permite acentuación de palabras   
*/
function desencriptar(mensaje){
    // Se hacen los reemplazos necesarios en diferentes líneas para evitar
    // que el comando sea demasiado largo, pero bien podría ser una sola línea
    var resultado = mensaje.replace(/enter/g, "e").replace(/imes/g, "i");
    return resultado.replace(/ai/g, "a").replace(/ober/g, "o").replace(/ufat/g, "u");
    // NOTA: El modificador "g" en la expresión regular hace que el reemplazo
    // se aplique a todas las coincidencias encontradas y no sólo a la primera
}


/* Esta función permite evitar que se repita mucho código a la hora de usar el
eventListener de los botones de encripación y desencriptación */
function picarBotonesEncriptacion(event, cadena){
    event.preventDefault();
	var texto = document.querySelector("#input-texto").value;
    texto = estandarizarTexto(texto) // Se estandariza el texto

    // Esta es la única diferencia entre las acciones del botón
    // de encriptado y el de desencriptado
    if (cadena=="encriptar"){
        texto = encriptar(texto);
    }
    else{
        texto = desencriptar(texto);
    }

    // Se muestra el resultado
	document.getElementById("msg").value = texto;
}


// Se definen las variables con las que se va a trabajar
var botonEncriptar = document.getElementById("btn-encriptar");
var botonDesencriptar = document.getElementById("btn-desencriptar");
var botonCopiar = document.getElementById("btn-copy");

// Se ejecutan los eventos de interés
botonEncriptar.addEventListener("click", function(){
    picarBotonesEncriptacion(event, "encriptar");
});

botonDesencriptar.addEventListener("click", function(){
    picarBotonesEncriptacion(event, "desencriptar");
});

botonCopiar.addEventListener("click", function(){
    // Fuente: https://dev.to/walternascimentobarroso/creating-copy-button-with-js-4763
    var texto = document.querySelector("#msg");
    texto.select();
    document.execCommand("copy");
})