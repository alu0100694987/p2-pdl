"use strict"; // ECMAScript 5 strict mode

$(document).ready(function() {
  $("button").click(function() {
    calculate();
  });
});

function calculate() {
  
  var result; // Resultado
  var original = document.getElementById("original"); // Elemento introducido
  var temp = original.value; // Valor del elemento introducido (cadena csv)
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  var lines = temp.split(/\n+\s*/); // Se separa la cadena csv por los saltos de línea
  var commonLength = NaN;
  var r = [];
  
  /* Plantilla underscore (con truco malvado) */
  var row = "<% _.each(items, function(name) { %>" +
            " <td><%= name %></td>" +
            " <% }); %>";

  if (window.localStorage) localStorage.original = temp;
  
  for(var t in lines) { // Por cada línea introducida
  
    var temp = lines[t];
    var m = temp.match(regexp); // Se selecciona lo que caza con la expresión regular
    var result = [];
    var error = false;
    
    /* Si ha casado con algo */
    if (m) {
    
      /* Si la longitud de 'm' no es nula (se ha procesado la primera línea), y no coincide con la de la línea actual (el número de columnas es distinto), se produce un error */
      if (commonLength && (commonLength != m.length)) {
        //alert('Error: El registro <' + temp + '> tiene ' + m.length + ' elemento/s');
        error = true;
      }
      
      /* La cantidad de columnas es correcta */
      else {
        commonLength = m.length; // Se indica la longitud que deben cumplir todas las líneas (para que tengan el mismo número de columnas)
        error = false;
      }
      
      /* Para cada elemento con el que se ha casado */
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,''); // Se elimina la coma
        var removefirstquote = removecomma.replace(/^\s*"/,''); // Se elimina la comilla doble inicial
        var removelastquote = removefirstquote.replace(/"\s*$/,''); // Se elimina la comilla doble final
        var removeescapedquotes = removelastquote.replace(/\\"/,'"'); // Se sustituyen las comillas escapadas por comillas
        result.push(removeescapedquotes);
      }
      
      var tr = error? '<tr class="error">' : '<tr>'; // Si ha ocurrido algun error, la clase de la fila en la que ha ocurrido sera 'error' (para la utlizacion de estilos)
      r.push(tr + _.template(row, {items : result}) + "</tr>"); // Se utiliza una plantilla para mostrar las filas
    }
    
    /* Si no ha casado con nada */
    else {
      //alert('Error: El registro <' + temp + '> no es una cadena CSV permitida');
      error = true;
    }
  }
  
  /* Se sitúa el resultado dentro de una tabla de la clase 'center', y esta dentro de un párrafo */
  r.unshift('<table class="center" id="result">');
  r.push('</table>');
  
  //alert(r.join('\n'));
  
  target.innerHTML = r.join('\n');
}

window.onload = function() {
  
  /* Se comprueba si el navegador soporta localStorage y algún dato almacenado */
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};