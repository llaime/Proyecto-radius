<?php

include "../includes/conexion.inc.php";
include "../includes/mysql.inc.php";
include "../includes/utiles.inc.php";

$con = Conexion($host1, $user1, $pass1, $db1);
if (isset($_GET['nombre'])) {

    $sql = "SELECT id FROM usuario WHERE nombre ='" . $_GET['nombre'] . "'";
    $id  = $con->query($sql);
    foreach ($id as $fila) {
        $con->query("delete from usuario_mac where usuario_id=" . $fila['id']);
        $con->query("delete from usuario_grupo where usuario_id=" . $fila['id']);
        $con->query("delete from usuario where id=" . $fila['id']);
    }
} else if (isset($_GET['grupo'])) {
    $sql = "SELECT id FROM grupo WHERE nombre ='" . $_GET['grupo'] . "'";
    $id  = $con->query($sql);
    foreach ($id as $fila) {
        $usuarios = $con->query("SELECT usuario_id as id from usuario_grupo where grupo_id =" . $fila['id']);
        foreach ($usuarios as $dato) {
            $con->query("delete from des_horario where grupo_id=" . $fila['id']);

            $con->query("delete from usuario_mac where usuario_id=" . $dato['id']);

            $con->query("delete from des_gru where grupo_id=" . $fila['id']);
            //esta sql borra la relacion grupo usuario
            $con->query("delete from usuario_grupo where grupo_id=" . $fila['id']);
            //esta sql borra el usuario
            $con->query("delete from usuario where id=" . $dato['id']);
        }
        $con->query("delete from grupo where id=" . $fila['id']);
    }
} else if (isset($_GET['tabla'])) {
    $tabla = $_GET['tabla'];
    for ($i = 1; $i <= $_GET["long"]; $i++) {
        $sql = 'DELETE FROM ' . $tabla . ' WHERE id = ' . $_GET["input" . $i];
        $con->query($sql);
    }
} else if (isset($_GET['id'])) {
    $id = $con->query("SELECT id FROM grupo WHERE nombre ='" . $_GET["id"] . "'");
    foreach ($id as $fila) {
        $sql = "DELETE FROM des_gru where grupo_id = " . $fila["id"];
        $con->query($sql);
    }
} else if (isset($_GET['ip'])) {
    $sql = "DELETE FROM cliente where ip = '" . $_GET["ip"] . "'";
    $con->query($sql);
} else if (isset($_GET['admin'])) {
    $a   = "admin";
    $sql = "DELETE FROM " . $a . " where usuario = '" . $_GET["admin"] . "'";
    $con->query($sql);
} else if (isset($_GET['horarg'])) {
    $id = $con->query("SELECT id from grupo where nombre ='" . $_GET['horarg'] . "'");
    foreach ($id as $fila) {
        $con->query("DELETE FROM des_horario where grupo_id = " . $fila['id']);
    }
} else if (isset($_GET['horaru'])) {
    list($ini, $fin, $grupo) = explode("-", $_GET['horaru']);
    $id                      = $con->query("SELECT id from grupo where nombre ='" . $grupo . "'");

    foreach ($id as $fila) {
        $con->query("DELETE FROM des_horario where hora_ini = '" . $ini . "' and hora_fin = '" . $fin . "' and grupo_id = '" . $fila['id'] . "'");
    }

}
