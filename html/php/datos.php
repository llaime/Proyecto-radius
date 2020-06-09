<?php

include "../includes/conexion.inc.php";
include "../includes/mysql.inc.php";
include "../includes/utiles.inc.php";

if (isset($_GET["tabla"])) {
    $con  = Conexion($host1, $user1, $pass1, $db1);
    $con2 = Conexion($host2, $user2, $pass2, $db2);
    $con->query("SET NAMES utf8");
    $tabla = $_GET["tabla"];
    if ($tabla == "grupo") {

        $sql = "SELECT `usuario`.`nombre` AS usuario, usuario.contrasena as pass, `grupo`.`nombre` AS grupo FROM `usuario_grupo` INNER JOIN `usuario` ON `usuario`.`id` = `usuario_grupo`.`usuario_id` INNER JOIN `grupo` ON `grupo`.`id` = `usuario_grupo`.`grupo_id`";
    } elseif ($tabla == "grupo2") {
        $sql = "select * from grupo";
    } elseif ($tabla == "des_gru") {
        $sql = "select grupo.nombre as nombre, des_gru.hora_ini as inicial, des_gru.hora_fin as fin  from des_gru inner join grupo on grupo.id = des_gru.grupo_id";
    } elseif ($tabla == "usuario_mac") {
        $sql = "select grupo.nombre as grupo, usuario.nombre as usuario, usuario_mac.ip as ip, usuario_mac.mac as mac, usuario_mac.conectado as conectado from usuario_mac INNER join usuario on usuario.id = usuario_mac.usuario_id INNER JOIN usuario_grupo on usuario_grupo.usuario_id = usuario.id INNER JOIN grupo on usuario_grupo.grupo_id = grupo.id";
    } elseif ($tabla == "horario") {
        $sql = "SELECT grupo.nombre as grupo, des_horario.dia as dia, hora_ini as inicio, hora_fin as fin from des_horario INNER JOIN grupo on grupo.id = des_horario.grupo_id order by dia , inicio";
    } elseif ($tabla == "historico") {
        $sql = "select username as user, nasipaddress as ip, acctstarttime as inicio, acctstoptime as fin, acctsessiontime as tiempo , callingstationid as mac from radacct order by inicio desc";
    } else {
        $sql = "SELECT * FROM " . $tabla;
    }
    if ($tabla == "historico") {
        $usuarios = Seleccion($con2, $sql);
        echo json_encode($usuarios);
    } else if ($usuarios = Seleccion($con, $sql)) {
        echo json_encode($usuarios);
    }
}
