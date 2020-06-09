<?php
include "../includes/conexion.inc.php";
include "../includes/mysql.inc.php";
include "../includes/utiles.inc.php";

function sshkick($mac, $ip)
{
    if (!($con = ssh2_connect($ip, 22))) {

        echo "No se puede iniciar una conexión SSH";
    } else {
        if (!ssh2_auth_password($con, "admin", "")) {

            echo "error en la autenticación";
        } else {
            if (!($stream = ssh2_exec($con, '/interface wireless registration-table remove [/interface wireless registration-table find mac-address="' . $mac . '"]'))) {
                echo "error al ejecutar los comandos";
            } else {
                echo "usuario fuera";
            }
        }
    }
}
$con = Conexion($host1, $user1, $pass1, $db1);
$con->query("SET NAMES utf8");

if (isset($_GET['id']) && isset($_GET['hora'])) {
    $hora   = getdate();
    $verdad = $hora['hours'] + $_GET['hora'];
    if ($verdad > 23) {
        if (date('t') == date('d')) {
            if (date('m') == 12) {
                $fecha = (date('Y') + 1) . "-" . 01 . "-" . 01;
            } else {
                $verdad = ($hora['hours'] - 24) + $_GET['hora'];
                $fecha  = date('Y') . "-" . (date('m') + 1) . "-" . 01;
            }
        } else {
            $verdad = ($hora['hours'] - 24) + $_GET['hora'];
            $fecha  = date('Y') . "-" . date('m') . "-" . (date('d') + 1);
        }
    } else {
        $fecha = date('Y') . "-" . date('m') . "-" . date('d');
    }
    $actual = $fecha . " " . $verdad . ":" . $hora['minutes'] . ":" . $hora['seconds'];
    $sql    = "INSERT INTO des_gru VALUES(" . $_GET['id'] . ",null,'" . $actual . "')";
    if ($con->query($sql)) {
        $kicku = $con->query("select usuario_mac.mac as mac, usuario_mac.ip as ip from usuario_mac inner join usuario_grupo on usuario_mac.usuario_id = usuario_grupo.usuario_id and usuario_grupo.grupo_id=" . $_GET['id']);
        foreach ($kicku as $ssh) {
            sshkick($ssh['mac'], $ssh['ip']);
        }
    }
}
