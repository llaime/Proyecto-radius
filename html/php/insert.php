
<?php
include "../includes/conexion.inc.php";
include "../includes/mysql.inc.php";
include "../includes/utiles.inc.php";

function pass($numero)
{
    if ($numero) {
        $caracteres = 'abcdefghijklmnopqrstuvwxyz';
    } else {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }

    $longpalabra = 8;
    for ($pass = '', $n = strlen($caracteres) - 1; strlen($pass) < $longpalabra;) {
        $x = rand(0, $n);
        $pass .= $caracteres[$x];
    }
    return $pass;
}
$con = Conexion($host1, $user1, $pass1, $db1);
if (isset($_GET['usuario']) && isset($_GET['grupo'])) {

    $pass = pass(false);
    $sql  = "INSERT INTO usuario VALUES(null,'" . $_GET['usuario'] . "','" . $pass . "')";
    if ($con->query($sql) === true) {
        $selec = $con->query("select usuario.id as uid, grupo.id as gid from usuario,grupo where usuario.nombre = '" . $_GET['usuario'] . "' and grupo.nombre = '" . $_GET['grupo'] . "' ");
        foreach ($selec as $dato) {
            $con->query("INSERT INTO usuario_grupo VALUES(" . $dato['uid'] . "," . $dato['gid'] . ")");
        }
    }
} else if (isset($_GET['usuarioa']) && isset($_GET['grupoa'])) {
    $selec = $con->query("select usuario.id as uid, grupo.id as gid from usuario,grupo where usuario.nombre = '" . $_GET['usuarioa'] . "' and grupo.nombre = '" . $_GET['grupoa'] . "' ");
    foreach ($selec as $dato) {
        $con->query("INSERT INTO usuario_grupo VALUES(" . $dato['uid'] . "," . $dato['gid'] . ")");
    }
} else if (isset($_GET['IP']) && isset($_GET['nombre'])) {
    $con->query("INSERT INTO cliente VALUES('','" . $_GET['IP'] . "','" . $_GET['nombre'] . "','" . $_GET['pass'] . "','" . $_GET['descr'] . "')");
} else if (isset($_GET['long'])) {
    for ($i = 0; $i < $_GET['long']; $i++) {
        $j= $i + 1;
        list($id, $dia, $ini, $fin) = explode(",", $_GET['time' . $j]);
        //$datos = explode(",",$_GET['time'.$j]);
        $con->query("INSERT INTO des_horario VALUES(" . $id . ",'" . $dia . "','" . $ini . "','" . $fin . "')");
        
    }

} else if(isset($_GET['pass'])){
    $con->query("UPDATE usuario SET contrasena = '" . pass(false) . "' where nombre = '" . $_GET['pass'] . "'");

} else if (!empty($_POST)) {
    if (isset($_POST['pass'])) {
        $a        = 'admin';
        $passhash = password_hash($_POST['pass'], PASSWORD_DEFAULT);
        $con->query("INSERT INTO " . $a . " VALUES('','" . $_POST['nombre'] . "','" . $_POST['user'] . "','" . $passhash . "')");
    } else if (isset($_POST['cambio'])) {
        $a        = 'admin';
        $passhash = password_hash($_POST['cambio'], PASSWORD_DEFAULT);
        $con->query("UPDATE " . $a . " SET pass = '" . $passhash . "' where usuario = '" . $_POST['id'] . "'");
    }
}

?>