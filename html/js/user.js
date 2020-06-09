function crearELE(padre, tag, anterior) {
    var hijo = document.createElement(tag);
    if (anterior == 0) {
        padre.appendChild(hijo);
    } else {
        padre.insertBefore(hijo, anterior);
    }
    return hijo;
}


function usuario(json) {
    var div = document.getElementById("tabla");
        var tabla = crearELE(div, "table", 0);
        tabla.setAttribute("class", "table table-bordered tablita");
        var fila = crearELE(tabla, "tr", 0);
        fila.setAttribute("class", "table-secondary")
        var celda = crearELE(fila, "th", 0);
        celda.setAttribute("scope", "col")
        celda.setAttribute("class", "mb-1")
        celda.innerHTML = "Nombre"
        for (var j = 0; j < json.length; j++) {
           
                var fila = crearELE(tabla, "tr", 0);
                fila.setAttribute("class", "table-secondary")
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                celda.innerHTML = json[j].usuario;
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                celda.innerHTML = json[j].mac;
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                celda.innerHTML = json[j].ip;
            }
    
}

var h2 = document.getElementById("nombre").value

var frase = "simple=" + h2;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            consulta = JSON.parse(this.responseText);
            usuario(consulta)
        }
    };

    ajax.open("GET", "php/borrar.php?" + frase, true);
    ajax.send();