function crearELE(padre, tag, anterior) {
    var hijo = document.createElement(tag);
    if (anterior == 0) {
        padre.appendChild(hijo);
    } else {
        padre.insertBefore(hijo, anterior);
    }
    return hijo;
}




/*
function borrar() {
    var inputs = document.getElementsByName("input")
    var frase = "";
    var long = 0;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            long++;
            frase += "&input" + long + "=" + inputs[i].value;
        }
    }
    var enviar = "?tabla=" + php + "&long=" + long + frase;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = path
        }
    };
    ajax.open("GET", "php/borrar.php" + enviar, true);
    ajax.send();
}
*/


function envrouter() {
    var inputs = document.getElementsByTagName("input")
    if (inputs.nombre.value != "" && inputs.ip.value != "") {
        var frase = "IP=" + inputs.ip.value + "&nombre=" + inputs.nombre.value + "&pass=" + inputs.pass.value + "&descr=" + inputs.descr.value;
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.location.href = window.location.href
            }
        };

        ajax.open("GET", "php/insert.php?" + frase, true);
        ajax.send();
    } else {
        alert("no puedes dejar ni ip ni el nombre vacio")
    }


}

function borrarrouter() {
    var frase = "ip=" + this.id;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/borrar.php?" + frase, true);
    ajax.send();
}

function router(json) {
    var div = document.getElementById("tabla");
    var p = crearELE(div, "p", 0);
    var tabla = crearELE(p, "table", 0);
    tabla.setAttribute("class", "table table-bordered tablita");
    var fila = crearELE(tabla, "tr", 0);
    fila.setAttribute("class", "table-secondary")
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("scope", "col");
    var input = crearELE(celda, "input", 0);
    input.setAttribute("class", "usu")
    input.setAttribute("name", "ip");
    input.setAttribute("placeholder", "Ip");
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("scope", "col");
    var input = crearELE(celda, "input", 0);
    input.setAttribute("class", "usu")
    input.setAttribute("name", "nombre");
    input.setAttribute("placeholder", "Nombre");
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("scope", "col");
    var input = crearELE(celda, "input", 0);
    input.setAttribute("class", "usu")
    input.setAttribute("name", "pass");
    input.setAttribute("placeholder", "Secret");
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("scope", "col");
    var input = crearELE(celda, "input", 0);
    input.setAttribute("class", "usu")
    input.setAttribute("name", "descr");
    input.setAttribute("placeholder", "Descripcion");
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("scope", "col");
    var input = crearELE(celda, "button", 0);
    input.setAttribute("name", "anadir");
    input.setAttribute("class", "btn btn-success btn-block");
    input.addEventListener("click", envrouter);
    input.innerHTML = "Añadir";
    for (var i = 0; i < json.length; i++) {
        var fila = crearELE(tabla, "tr", 0);
        fila.setAttribute("class", "table-secondary")
        var celda = crearELE(fila, "td", 0);
        celda.setAttribute("class", "interior")
        celda.innerHTML = json[i].ip;
        var celda = crearELE(fila, "td", 0);
        celda.setAttribute("class", "interior")
        celda.innerHTML = json[i].nombre;
        var celda = crearELE(fila, "td", 0);
        celda.setAttribute("class", "interior")
        celda.innerHTML = json[i].contrasena;
        var celda = crearELE(fila, "td", 0);
        celda.setAttribute("class", "interior")
        celda.innerHTML = json[i].descripcion;
        var celda = crearELE(fila, "td", 0);
        celda.setAttribute("class", "interior")
        var input = crearELE(celda, "button", 0);
        input.setAttribute("id", json[i].ip);
        input.addEventListener("click", borrarrouter);
        input.setAttribute("class", "btn btn-danger btn-block");
        input.innerHTML = "Borrar";

    }

}

function env() {
    var inputs = document.getElementsByTagName("input")[this.id]
    if (inputs.value != "") {
        var frase = "usuario=" + inputs.value + "&grupo=" + inputs.name;
    } else {
        alert("no puede introducir un usuario vacio")
    }

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/insert.php?" + frase, true);
    ajax.send();

}

function borraru() {

    var frase = "nombre=" + this.id;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/borrar.php?" + frase, true);
    ajax.send();
}

function borrarg() {
    var frase = "grupo=" + this.id;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/borrar.php?" + frase, true);
    ajax.send();


}

function contargru(json) {
    var diferente = [];
    diferente[0] = json[0].grupo;
    var contador = 0;
    for (var i = 0; i < json.length; i++) {
        for (var j = 0; j < diferente.length; j++) {
            if (json[i].grupo == diferente[j]) {
                break;
            } else if (json[i].grupo != diferente[j] && j == diferente.length - 1) {
                contador++;
                diferente[contador] = json[i].grupo;
            }
        }
    }
    return diferente;
}

function anadirrel() {

    var usuario = this.innerHTML
    var grupo = this.value
    if (grupo != "") {
        var frase = "usuarioa=" + usuario + "&grupoa=" + grupo;
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.location.href = window.location.href
            }
        };

        ajax.open("GET", "php/insert.php?" + frase, true);
        ajax.send();
    } else {
        alert("por favor marque la opcion con un nombre")
    }

}

function cambiarpass(){
    var id = this.id
    var frase = "pass="+ id
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/insert.php?" + frase, true);
    ajax.send();
}

function grupo(json) {
    var div = document.getElementById("tabla");
    var diferente = contargru(json);
    for (var i = 0; i < diferente.length; i++) {
        var tabla = crearELE(div, "table", 0);
        tabla.setAttribute("class", "table table-bordered tablita table-bordered");
        var fila = crearELE(tabla, "tr", 0);
        fila.setAttribute("class", "table-secondary")
        var celda = crearELE(fila, "th", 0);
        celda.setAttribute("scope", "col")
        celda.setAttribute("class", "mb-1")
        celda.innerHTML = diferente[i]
        var celda = crearELE(fila, "th", 0);
        var input = crearELE(celda, "button", 0);
        input.setAttribute("id", diferente[i]);
        input.setAttribute("class", "btn btn-secondary btn-block");
        input.addEventListener("click", borrarg);
        input.innerHTML = "Borrar";
        var fila = crearELE(tabla, "tr", 0);
        fila.setAttribute("class", "table-secondary")
        var celda = crearELE(fila, "th", 0);
        celda.setAttribute("scope", "col");
        var input = crearELE(celda, "input", 0);
        input.setAttribute("class", "usu")
        input.setAttribute("id", "nombre");
        input.setAttribute("placeholder", "Nombre");
        input.setAttribute("name", diferente[i]);
        var celda = crearELE(fila, "th", 0);
        celda.setAttribute("scope", "col");
        var input = crearELE(celda, "button", 0);
        input.setAttribute("class", "btn btn-success btn-block");
        input.setAttribute("id", i);
        input.addEventListener("click", env);
        input.innerHTML = "Añadir";
        for (var j = 0; j < json.length; j++) {
            if (diferente[i] == json[j].grupo) {
                var fila = crearELE(tabla, "tr", 0);
                fila.setAttribute("class", "table-secondary")
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                celda.innerHTML = json[j].usuario;
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                celda.innerHTML = json[j].pass;
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                var input = crearELE(celda, "button", 0);
                input.setAttribute("id", json[j].usuario);
                input.addEventListener("click", borraru);
                input.setAttribute("class", "btn btn-danger btn-block");
                input.innerHTML = "Borrar";
                var celda = crearELE(fila, "td", 0);
                var input = crearELE(celda, "button", 0);
                input.setAttribute("id", json[j].usuario);
                input.setAttribute("class", "btn btn-warning btn-block");
                input.addEventListener("click", cambiarpass);
                input.innerHTML = "Cambiar Contraseña";
                
            }
        }
        var fila = crearELE(tabla, "tr", 0);
        fila.setAttribute("class", "table-secondary")
        var celda = crearELE(fila, "td", 0);
        var select = crearELE(celda, "select", 0);
        select.setAttribute("class", "form-control");
        var option = crearELE(select, "option", 0);
        option.innerHTML = "";
        for (var j = 0; j < json.length; j++) {
            var option = crearELE(select, "option", 0);
            option.value = diferente[i];
            option.innerHTML = json[j].usuario;
            option.addEventListener("click", anadirrel);
        }
    }
}

function conectados(json) {
    var div = document.getElementById("tabla");
    var diferente = contargru(json);
    for (var i = 0; i < diferente.length; i++) {
        var div = crearELE(div, "div", 0);
        var tabla = crearELE(div, "table", 0);
        tabla.setAttribute("class", "table table-bordered tablita");
        var fila = crearELE(tabla, "tr", 0);
        fila.setAttribute("class", "table-secondary")
        var celda = crearELE(fila, "th", 0);
        celda.setAttribute("scope", "col")
        celda.setAttribute("class", "mb-1")
        celda.innerHTML = diferente[i]
        for (var j = 0; j < json.length; j++) {
            if (diferente[i] == json[j].grupo) {
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
    }
}

function envadmin() {
    var inputs = document.getElementsByTagName("input")

    if (inputs.user.value != "" && inputs.pass.value != "") {
        var frase = "user=" + inputs.user.value + "&pass=" + inputs.pass.value + "&nombre=" + inputs.nombre.value
        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.location.href = window.location.href
            }
        };
        ajax.open("POST", "../php/insert.php", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(frase);
    } else {
        alert("no puedes dejar ni el nombre vacio ni la contraseña vacio")
    }
}

function borraradmin() {
    var frase = "admin=" + this.id;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/borrar.php?" + frase, true);
    ajax.send();
}

function cambiarcontrasi() {
    this.removeEventListener("click", cambiarcontrasi)
    var br = crearELE(this.parentNode, "br", 0);
    var input = crearELE(this.parentNode, "input", 0);
    this.setAttribute("name", 1)
    input.setAttribute("type", "password")
    input.id = this.id + "a";
    this.removeAttribute("class")
    this.setAttribute("class", "btn btn-success btn-block")
    this.innerHTML = "¿Cambiar Contraseña?";
    this.addEventListener("click", cambiarcontrano)
}

function cambiarcontrano() {
    var dato = document.getElementById(this.id + "a").value;
    this.parentNode.removeChild(this.parentNode.childNodes[this.name])
    this.parentNode.removeChild(this.parentNode.childNodes[this.name])
    this.removeAttribute("class")
    this.setAttribute("class", "btn btn-warning btn-block")
    this.innerHTML = "Cambiar Contraseña";
    this.removeEventListener("click", cambiarcontrano)
    this.addEventListener("click", cambiarcontrasi)
    if (dato != "") {
        var frase = "cambio=" + dato + "&id=" + this.id;

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //document.location.href = window.location.href
                console.log(frase)
            }
        };
        ajax.open("POST", "../php/insert.php", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(frase);
    }
}

function admin(json) {
    var div = document.getElementById("tabla");
    var p = crearELE(div, "p", 0);
    var tabla = crearELE(p, "table", 0);
    tabla.setAttribute("class", "table table-bordered tablita");
    var fila = crearELE(tabla, "tr", 0);
    fila.setAttribute("class", "table-secondary")
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("scope", "col");
    celda.setAttribute("class", "mb-1")
    var input = crearELE(celda, "input", 0);
    input.setAttribute("class", "usu");
    input.setAttribute("name", "nombre");
    input.setAttribute("placeholder", "nombre");
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "mb-1")
    celda.setAttribute("scope", "col");
    var input = crearELE(celda, "input", 0);
    input.setAttribute("class", "usu");
    input.setAttribute("name", "user");
    input.setAttribute("placeholder", "Usuario");
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "mb-1")
    celda.setAttribute("scope", "col");
    var input = crearELE(celda, "input", 0);
    input.setAttribute("class", "usu");
    input.setAttribute("name", "pass");
    input.setAttribute("placeholder", "Contraseña");
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "mb-1")
    celda.setAttribute("scope", "col");
    var input = crearELE(celda, "button", 0);
    input.setAttribute("name", "anadir");
    input.setAttribute("class", "btn btn-success btn-block");
    input.addEventListener("click", envadmin);
    input.innerHTML = "Añadir";
    for (var i = 0; i < json.length; i++) {
        var fila = crearELE(tabla, "tr", 0);
        fila.setAttribute("class", "table-secondary")
        var celda = crearELE(fila, "td", 0);
        celda.setAttribute("class", "interior")
        celda.innerHTML = json[i].nombre;
        var celda = crearELE(fila, "td", 0);
        celda.setAttribute("class", "interior")
        celda.innerHTML = json[i].usuario;
        if (json[i].usuario != "creador") {
            var celda = crearELE(fila, "td", 0);
            var input = crearELE(celda, "button", 0);
            input.setAttribute("id", json[i].usuario);
            input.setAttribute("class", "btn btn-danger btn-block");
            input.addEventListener("click", borraradmin);
            input.innerHTML = "Borrar";
            var celda = crearELE(fila, "td", 0);
            var input = crearELE(celda, "button", 0);
            input.setAttribute("id", json[i].usuario);
            input.setAttribute("class", "btn btn-warning btn-block");
            input.addEventListener("click", cambiarcontrasi);
            input.innerHTML = "Cambiar Contraseña";
        } else {
            var celda = crearELE(fila, "td", 0);
            var celda = crearELE(fila, "td", 0);
            var input = crearELE(celda, "button", 0);
            input.setAttribute("id", json[i].usuario);
            input.setAttribute("class", "btn btn-warning btn-block");
            input.addEventListener("click", cambiarcontrasi);
            input.innerHTML = "Cambiar Contraseña";
        }
    }
}

function horario() {
    var option = document.getElementsByTagName("option");
    for (var i = 0; i < option.length; i++) {
        if (option[i].selected) {
            var grupo = option[i].value
        }
    }
    var time = document.getElementsByName("time");
    var frase = "";
    var long = 0;
    for (var i = 0; i < time.length; i++) {
        if (time[i].value != "" && time[i + 1].value != "") {
            if (time[i].id.indexOf('ini') != -1 && time[i + 1].id.indexOf('fin') != -1 && time[i].id[4] == time[i + 1].id[4]) {
                if (!(time[i].value >= time[i + 1].value)) {
                    long++;
                    frase += "&time" + long + "=" + grupo + "," + time[i].id.slice(6) + "," + time[i].value + "," + time[i + 1].value
                    i++;
                } else {
                    alert("la hora de comienzo del rango horario, no puede ser mayor o igual a la del final.")
                }
            } else {
                alert("la hora de comienzo del rango horario, no puede ser mayor o igual a la del final.")
            }

        }
    }
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/insert.php?long=" + long + frase, true);
    ajax.send();

}

function semanal(json) {
    var div = document.getElementById("tabla");
    var semana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    var tabla = crearELE(div, "table", 0);
    tabla.setAttribute("class", "table table-bordered tablota");
    var fila = crearELE(tabla, "tr", 0);
    fila.setAttribute("class", "table-secondary")
    var celda = crearELE(fila, "td", 0);
    celda.setAttribute("class", "interior")
    var select = crearELE(celda, "select", 0);
    select.setAttribute("class", "form-control");
    select.setAttribute("id", "select");
    for (var i = 0; i < json.length; i++) {
        var option = crearELE(select, "option", 0);
        option.value = json[i].id;
        option.innerHTML = json[i].nombre
    }
    var br = crearELE(celda, "br", 0);
    var input = crearELE(celda, "button", 0);
    input.setAttribute("name", "anadir");
    input.setAttribute("class", "btn btn-success btn-block");
    input.addEventListener("click", horario);
    input.innerHTML = "Añadir";
    var celda = crearELE(fila, "td", 0);
    celda.setAttribute("class", "interior")
    for (var j = 1; j <= 5; j++) {
        var div = crearELE(celda, "div", 0);
        div.setAttribute("class", "row")
        var label = crearELE(celda, "label", 0);
        label.innerHTML = semana[j - 1]
        for (var k = 0; k < 1; k++) {
            var div = crearELE(celda, "div", 0);
            div.setAttribute("class", "col")
            var input = crearELE(celda, "input", 0);
            input.setAttribute("type", "time")
            input.setAttribute("class", "time")
            input.setAttribute("name", "time")
            input.setAttribute("id", "ini-" + k + "-" + j);
            var input = crearELE(celda, "input", 0);
            input.setAttribute("type", "time")
            input.setAttribute("class", "time")
            input.setAttribute("name", "time")
            input.setAttribute("id", "fin-" + k + "-" + j);
        }
    }

}

function borrargruhor() {
    var frase = "horarg=" + this.id;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/borrar.php?" + frase, true);
    ajax.send();
}

function borrarsinhor() {
    var frase = "horaru=" + this.id;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.location.href = window.location.href
        }
    };

    ajax.open("GET", "php/borrar.php?" + frase, true);
    ajax.send();
}

function mostrarhorario(json) {
    var div = document.getElementById("tabla");
    var diferente = contargru(json)
    var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
    for (var i = 0; i < diferente.length; i++) {
        var div = crearELE(div, "div", 0);
        var tabla = crearELE(div, "table", 0);
        tabla.setAttribute("class", "table table-bordered tablita");
        var fila = crearELE(tabla, "tr", 0);
        fila.setAttribute("class", "table-secondary")
        var celda = crearELE(fila, "th", 0);
        celda.setAttribute("scope", "col")
        celda.setAttribute("class", "mb-1")
        celda.innerHTML = diferente[i];
        var celda = crearELE(fila, "td", 0);
        var input = crearELE(celda, "button", 0);
        input.setAttribute("id", diferente[i]);
        input.addEventListener("click", borrargruhor);
        input.setAttribute("class", "btn btn-danger btn-block");
        input.innerHTML = "Borrar";
        for (var j = 0; j < json.length; j++) {
            if (diferente[i] == json[j].grupo) {
                var fila = crearELE(tabla, "tr", 0);
                fila.setAttribute("class", "table-secondary")
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                celda.innerHTML = dias[json[j].dia - 1];
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                celda.innerHTML = json[j].inicio;
                var celda = crearELE(fila, "td", 0);
                celda.setAttribute("class", "interior")
                celda.innerHTML = json[j].fin;
                var celda = crearELE(fila, "td", 0);
                var input = crearELE(celda, "button", 0);
                input.setAttribute("id", json[j].inicio + "-" + json[j].fin + "-" + diferente[i]);
                input.addEventListener("click", borrarsinhor);
                input.setAttribute("class", "btn btn-danger btn-block");
                input.innerHTML = "Borrar";
            }
        }
    }
}

function historico(json) {
    var div = document.getElementById("tabla");
    var tabla = crearELE(div, "table", 0);
    tabla.setAttribute("class", "table table-bordered tablita");
    var fila = crearELE(tabla, "tr", 0);
    fila.setAttribute("class", "table-secondary")
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    celda.innerHTML = "Usuario";
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    celda.innerHTML = "Ip router";
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    celda.innerHTML = "Inicio Conexion";
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    celda.innerHTML = "Fin Conexion";
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    celda.innerHTML = "Tiempo";
    var celda = crearELE(fila, "th", 0);
    celda.setAttribute("class", "interior")
    celda.innerHTML = "Mac";
    for (var i = 0; i < json.length; i++) {
        if (json[i].fin != null) {
            var fila = crearELE(tabla, "tr", 0);
            fila.setAttribute("class", "table-secondary")
            var celda = crearELE(fila, "td", 0);
            celda.setAttribute("class", "interior")
            celda.innerHTML = json[i].user
            var celda = crearELE(fila, "td", 0);
            celda.setAttribute("class", "interior")
            celda.innerHTML = json[i].ip
            var celda = crearELE(fila, "td", 0);
            celda.setAttribute("class", "interior")
            celda.innerHTML = json[i].inicio
            var celda = crearELE(fila, "td", 0);
            celda.setAttribute("class", "interior")
            celda.innerHTML = json[i].fin
            var celda = crearELE(fila, "td", 0);
            celda.setAttribute("class", "interior")
            if (json[i].tiempo > 60) {
                var tiempo = Math.round(json[i].tiempo / 60)
                var frase = ""
                if (tiempo > 60) {
                    tiempo = Math.round(tiempo / 60)
                    if (json[i].tiempo % 60 != 0) {
                        frase = tiempo + " hrs " + (tiempo * 60) + " mins " + (json[i].tiempo % 60) + " sec"
                        celda.innerHTML = frase;
                    } else {
                        celda.innerHTML = tiempo + " min"
                    }
                } else {
                    if (json[i].tiempo % 60 != 0) {
                        frase = tiempo + " mins " + (json[i].tiempo % 60) + " sec"
                        celda.innerHTML = frase;
                    } else {
                        celda.innerHTML = tiempo + " min"
                    }
                }
            } else {
                celda.innerHTML = json[i].tiempo + " sec"
            }
            var celda = crearELE(fila, "td", 0);
            celda.setAttribute("class", "interior")
            celda.innerHTML = json[i].mac
        }
    }
}

var path = window.location.pathname
var php = "";
var aux = 0;
if (path == "/lista.php") {
    php = "grupo"
} else if (path == "/routers.php") {
    php = "cliente"
} else if (path == "/inicio.php") {
    php = "usuario_mac"
} else if (path == "/administradores.php") {
    php = "admin"
} else if (path == "/semanal.php") {
    php = "grupo2"
} else if (path == "/horarios.php") {
    php = "horario"
} else if (path == "/historico.php") {
    php = "historico"
}

function start(php) {
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
                if (php == "grupo") {
                    grupo(consulta);
                } else if (php == "cliente") {
                    router(consulta);
                } else if (php == "usuario_mac") {
                    conectados(consulta);
                } else if (php == "admin") {
                    admin(consulta);
                } else if (php == "grupo2") {
                    semanal(consulta);
                } else if (php == "horario") {
                    mostrarhorario(consulta)
                } else if (php == "historico") {
                    historico(consulta)
                }
            } else {
                if (php == "grupo") {
                    alert("No hay usuarios que mostrar")
                } else if (php == "cliente") {
                    alert("No hay routers que mostrar")
                } else if (php == "usuario_mac") {

                } else if (php == "admin") {
                    alert("No hay administradores que mostrar")
                } else if (php == "grupo2") {
                    alert("No hay grupos que mostrar")
                } else if (php == "horario") {
                    alert("No hay horarios")
                } else if (php == "historico") {
                    alert("No hay historico")
                }
            }
        }
    };

    ajax.open("GET", "php/datos.php?tabla=" + php, true);
    ajax.send();
}

start(php);