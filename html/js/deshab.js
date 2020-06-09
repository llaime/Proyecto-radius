function crearELE(padre, tag, anterior) {
    var hijo = document.createElement(tag);
    if (anterior == 0) {
        padre.appendChild(hijo);
    } else {
        padre.insertBefore(hijo, anterior);
    }
    return hijo;
}

function des(json) {
    var selectdiv = document.getElementById("select");
    var diferente = [];
    diferente[0] = json[0].grupo_id;
    var tabla = crearELE(selectdiv, "table", 0);
    tabla.setAttribute("class", "table table-bordered tablita");
    var fila = crearELE(tabla, "tr", 0);
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    var select = crearELE(celda, "select", 0);
    select.setAttribute("class", "form-control");
    for (var i = 0; i < json.length; i++) {
        var option = crearELE(select, "option", 0);
        option.value = json[i].id;
        option.innerHTML = json[i].nombre
    }
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    var label = crearELE(celda, "div", 0);
    label.innerHTML = "Horas:"
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    var input = crearELE(celda, "input", 0);
    input.setAttribute = ('class', "form-control")
    input.name = "numero";
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "")
    var boton = crearELE(celda, "button", 0);
    boton.setAttribute("class", "btn btn-success btn-block");
    boton.innerHTML = "Añadir";
    boton.addEventListener("click", anadir);
    mostrar();
}

function mostrar() {
    var tabla = document.getElementById("tabla");
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                consulta = JSON.parse(this.responseText);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    consulta = "";
                }
            }
            if (consulta != "") {
                var tabla2 = crearELE(tabla, 'table', 0);
                tabla.setAttribute("class", "table table-bordered tablita");
                var tr = crearELE(tabla2, 'tr', 0);
                tr.setAttribute("class", "table-secondary")
                var th = crearELE(tr, 'th', 0);
                th.setAttribute("scope", "col");
                th.setAttribute("class", "coldes usu");
                th.innerHTML = "Grupo";
                var th = crearELE(tr, 'th', 0);
                th.setAttribute("scope", "col ");
                th.setAttribute("class", "coldes usu");
                th.innerHTML = "Hora Inicio";
                var th = crearELE(tr, 'th', 0);
                th.setAttribute("scope", "col");
                th.setAttribute("class", "coldes usu");
                th.innerHTML = "Hora Fin";
                var des = JSON.parse(this.responseText);
                for (var i = 0; i < des.length; i++) {
                    var tr = crearELE(tabla2, 'tr', 0);
                    tr.setAttribute("class", "table-secondary")
                    var td = crearELE(tr, 'td', 0);
                    td.setAttribute("class", "coldes usu");
                    td.innerHTML = des[i].nombre
                    var td = crearELE(tr, 'td', 0);
                    td.setAttribute("class", "coldes usu");
                    td.innerHTML = des[i].inicial;
                    var td = crearELE(tr, 'td', 0);
                    td.setAttribute("class", "coldes usu");
                    td.innerHTML = des[i].fin;
                    var td = crearELE(tr, 'td', 0);
                    td.setAttribute("class", "coldes usu");

                    var boton = crearELE(td, 'button', 0);
                    boton.innerHTML = "Borrar";
                    boton.value = des[i].nombre;
                    boton.setAttribute("class", "btn btn-danger btn-block");
                    boton.addEventListener("click", borrar)
                }
            } else {

            }

        }
    };

    ajax.open("GET", "php/datos.php?tabla=des_gru", true);
    ajax.send();
}

function borrar() {
    var frase = "id=" + this.value
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/borrar.php?" + frase, true);
    ajax.send();
}

function anadir() {
    var option = document.getElementsByTagName("option");
    for (var i = 0; i < option.length; i++) {
        if (option[i].selected) {
            var input = document.getElementsByTagName("input")[0]
            var valor = input.value * 1;
            if (valor < 24 && !(Object.is(valor, NaN))) {
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        document.location.href = window.location.href
                    }
                };

                ajax.open("GET", "php/des.php?id=" + option[i].value + "&hora=" + valor, true);
                ajax.send();
            } else {
                alert("El valor temporal, debe ser menor a 24h y solo un numero");
            }
        }
    }

}

var ajax = new XMLHttpRequest();
ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        try {
            consulta = JSON.parse(this.responseText);
        } catch (e) {
            if (e instanceof SyntaxError) {
                consulta = "";
            }
        }
        if (consulta != "") {
            des(consulta);

        } else {
            alert("No hay grupos a los que deshabilitar")
        }


    }
};

ajax.open("GET", "php/datos.php?tabla=grupo2", true);
ajax.send();