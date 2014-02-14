
var assert = chai.assert;

suite('CSV', function() {
  
    test('Prueba 1: Contenido por defecto', function() {
        original.value = "\"Los\", 10, \"elefantes\"\n\"rosa\", \"efervescentes\", \"beben\"\n\"agua\", \"en\", \"el\"\n\"bosque\", \"negro\", \"()>\"";
        calculate();
        assert.deepEqual(target.innerHTML, "<table class=\"center\" id=\"result\">\n<tbody><tr> <td>Los </td><td> 10 </td><td>elefantes </td> </tr>\n<tr> <td>rosa </td><td>efervescentes </td><td>beben </td> </tr>\n<tr> <td>agua </td><td>en </td><td>el </td> </tr>\n<tr> <td>bosque </td><td>negro </td><td>()&gt; </td> </tr>\n</tbody></table>");
    });
    
    test('Prueba 2: Texto sin comillas dobles', function() {
        original.value = "Que, los, pinguinos\nvelen, por, ti";
        calculate();
        assert.deepEqual(target.innerHTML, "<table class=\"center\" id=\"result\">\n<tbody><tr> <td>Que </td><td> los </td><td> pinguinos </td> </tr>\n<tr> <td>velen </td><td> por </td><td> ti </td> </tr>\n</tbody></table>");
    });
    
    test('Prueba 3: Error provocado', function() {
        original.value = "Soy, un, pinguino\ngenerando, un, error, malvado";
        calculate();
        assert.deepEqual(target.innerHTML, "<table class=\"center\" id=\"result\">\n<tbody><tr> <td>Soy </td><td> un </td><td> pinguino </td> </tr>\n<tr class=\"error\"> <td>generando </td><td> un </td><td> error </td><td> malvado </td> </tr>\n</tbody></table>");
    });
});