"use strict"; // ECMAScript 5 strict mode

$(document).ready(function() {
  $("button").click(function() {
    calculate();
  });
});

function calculate() {
  
  var result;
  var original = document.getElementById("original");
  var temp = original.value;
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  var lines = temp.split(/\n+\s*/);
  var commonLength = NaN;
  var r = [];
  // Template using underscore
  var row = "<% _.each(items, function(name) { %>" +
            " <td><%= name %></td>" +
            " <% }); %>";

  if (window.localStorage) localStorage.original = temp;
  
  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var result = [];
    var error = false;
    
    if (m) {
      if (commonLength && (commonLength != m.length)) {
        //alert('Error: El registro <' + temp + '> tiene ' + m.length + ' elemento/s');
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,'');
        var removefirstquote = removecomma.replace(/^\s*"/,'');
        var removelastquote = removefirstquote.replace(/"\s*$/,'');
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');
        result.push(removeescapedquotes);
      }
      var tr = error? '<tr class="error">' : '<tr>';
      r.push(tr + _.template(row, {items : result}) + "</tr>");
    }
    else {
      //alert('Error: El registro <' + temp + '> no es una cadena CSV permitida');
      error = true;
    }
  }
  
  r.unshift('<p>\n<table class="center" id="result">');
  r.push('</table>');
  
  //alert(r.join('\n')); // debug
  
  tabla_resultado.innerHTML = r.join('\n');
}

window.onload = function() {
  
  /* Se comprueba si el navegador soporta localStorage y algún dato almacenado */
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};