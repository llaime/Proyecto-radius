<?php

include "../includes/conexion.inc.php";
include "../includes/mysql.inc.php";
include "../includes/utiles.inc.php";

// funcion para borrar los BOM bytes del csv
function bom($s)
{
    if (substr($s, 0, 3) == chr(hexdec('EF')) . chr(hexdec('BB')) . chr(hexdec('BF'))) {
        return substr($s, 3);
    } else {
        return $s;
    }
}
if (isset($_FILES['subir_archivo']['tmp_name']) && $_FILES['subir_archivo']['tmp_name'] != "") {
    $con = Conexion($host1, $user1, $pass1, $db1);
//leo el csv
    $fichero = new SplFileObject($_FILES['subir_archivo']['tmp_name']);
    $fichero->setFlags(SplFileObject::READ_CSV);
    $fichero->setCsvControl(';');
//por cada fila hago un array
    foreach ($fichero as $fila) {
        if ($fila[0] != null) {
            //meto el valor de las celdas en un array
            list($ip, $nombre, $pass, $descr) = $fila;
            //inserto las linea
            $sql = "INSERT INTO cliente VALUES(null,'" . bom($ip) . "','" . bom($nombre) . "','" . bom($pass) . "','" . bom($descr) . "')";
            $con->query($sql);
        }
    }
    header('Location:' . $_SERVER['HTTP_REFERER']);
} else {
    header('Location:' . $_SERVER['HTTP_REFERER']);
}
