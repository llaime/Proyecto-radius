<?php
include "../includes/conexion.inc.php";
include "../includes/mysql.inc.php";
include "../includes/utiles.inc.php";

function convert($string)
{
    for ($i = 2; $i < strlen($string); $i++) {
        if ($string[$i] == "-") {
            $string[$i] = ":";
        }
    }
    return $string;
}

$conradius = Conexion($host2, $user2, $pass2, $db2);
$consinc   = Conexion($host1, $user1, $pass1, $db1);

$conradius->query("DELETE FROM nas");
$conradius->query("DELETE FROM radcheck");
$conradius->query("DELETE FROM radusergroup");
$conradius->query("DELETE FROM radgroupcheck");

$fecha  = date('Y') . "-" . date('m') . "-" . date('d');
$hora   = getdate();
$actual = $fecha . " " . $hora['hours'] . ":" . $hora['minutes'] . ":" . $hora['seconds'];
$actual = strtotime($actual);

/*
if ($usuario = Seleccion($consinc, "SELECT * FROM usuario")) {
foreach ($usuario as $campo) {
$sql = "INSERT INTO radcheck VALUES('" . $campo['id'] . "','" . $campo['nombre'] . "','Cleartext-Password',':=','" . $campo['contrasena'] . "')";
if ($conradius->query($sql)) {
} else {
echo "Error: " . $sql . "<br>" . $conradius->error;
}
}
}

if ($cliente = Seleccion($consinc, "SELECT * FROM cliente")) {
foreach ($cliente as $campo) {
$sql = "INSERT INTO nas VALUES('" . $campo['id'] . "','" . $campo['ip'] . "','" . $campo['nombre'] . "','other',null,'" . $campo['contrasena'] . "',null,null,'" . $campo['descripcion'] . "')";
if ($conradius->query($sql)) {
} else {
echo "Error: " . $sql . "<br>" . $conradius->error;
}
}
}
 */
/*if ($grupo = Seleccion($consinc, "SELECT `usuario`.`nombre` AS usuario, `grupo`.`nombre` AS grupo FROM `usuario_grupo` INNER JOIN `usuario` ON `usuario`.`id` = `usuario_grupo`.`usuario_id` INNER JOIN `grupo` ON `grupo`.`id` = `usuario_grupo`.`grupo_id`")) {
foreach ($grupo as $campo) {
$sql = "INSERT INTO radusergroup VALUES('" . $campo['usuario'] . "','" . $campo['grupo'] . "','1')";
if ($conradius->query($sql)) {
} else {
echo "Error: " . $sql . "<br>" . $conradius->error;
}
}
}
 */

/*if (($desusu = Seleccion($consinc, "SELECT * from des_usu")) != null) {
foreach ($desusu as $des) {
$fin = strtotime($des['hora_fin']);
if ($fin > $actual) {
$sql = "delete from radcheck where id =" . $des['usuario_id'];
if ($conradius->query($sql)) {
} else {
echo "Error: " . $sql . "<br>" . $conradius->error;
}
}else{
$sql = "delete from des_usu where usuario_id = ".$des['usuario_id'];
if ($consinc->query($sql)) {
} else {
echo "Error: " . $sql . "<br>" . $consinc->error;
}
}
}
}
 */

if ($horario = $consinc->query("SELECT grupo_id as id, dia, hora_ini as inicial , hora_fin as final from des_horario")) {
    $hoy     = date('N');
    $horahoy = $hora['hours'] . ":" . $hora['minutes'];
    foreach ($horario as $fila) {
        if ($hoy == $fila['dia'] && strtotime($horahoy) > strtotime($fila['inicial']) && strtotime($horahoy) < strtotime($fila['final'])) {
            $usuarios = $consinc->query("SELECT usuario.id as id, usuario.nombre as nombre, usuario.contrasena as pass from usuario INNER JOIN usuario_grupo on usuario_grupo.usuario_id = usuario.id INNER JOIN grupo on usuario_grupo.grupo_id = " . $fila['id'] . " GROUP BY usuario.id");
            foreach ($usuarios as $dato) {
                $conradius->query("delete from radcheck where id =" . $dato['id']);
                $conradius->query("INSERT INTO radcheck VALUES('" . $dato['id'] . "','" . $dato['nombre'] . "','Cleartext-Password',':=','" . $dato['pass'] . "')");
            }
        }
    }
}

if (($desgru = Seleccion($consinc, "SELECT des_gru.grupo_id, usuario_grupo.usuario_id as usuario, hora_fin from des_gru inner join usuario_grupo on des_gru.grupo_id= usuario_grupo.grupo_id ")) != null) {
    foreach ($desgru as $des) {
        $fin = strtotime($des['hora_fin']);
        if ($fin > $actual) {
            $sql = "delete from radcheck where id =" . $des['usuario'];
            if ($conradius->query($sql)) {
            } else {
                echo "Error: " . $sql . "<br>" . $conradius->error;
            }
        } else {

            $sql = "delete from des_gru where grupo_id = " . $des['grupo_id'];
            if ($consinc->query($sql)) {
            } else {
                echo "Error: " . $sql . "<br>" . $consinc->error;
            }
        }
    }
}
if (($descli = Seleccion($consinc, "SELECT * from des_cli")) != null) {
    foreach ($descli as $des) {
        $fin = strtotime($des['hora_fin']);
        if ($fin > $actual) {
            $sql = "delete from nas where id =" . $des['cliente_id'];
            if ($conradius->query($sql)) {
            } else {
                echo "Error: " . $sql . "<br>" . $conradius->error;
            }
        } else {
            $sql = "delete from des_cli where cliente_id = " . $des['cliente_id'];
            if ($consinc->query($sql)) {
            } else {
                echo "Error: " . $sql . "<br>" . $consinc->error;
            }
        }
    }
}

if ($usmac = $conradius->query("SELECT username as user, callingstationid as mac , nasipaddress as ip, acctstoptime as con from radacct")) {

    foreach ($usmac as $filamac) {
        $mac = convert($filamac['mac']);

        $sql2 = "SELECT id from usuario where nombre ='" . $filamac['user'] . "'";
        $idus = $consinc->query($sql2);
        foreach ($idus as $filaid) {
            $contador = 0;

            $repe = $consinc->query("SELECT usuario_id , mac FROM `usuario_mac` WHERE usuario_id = '" . $filaid['id'] . "' and mac = '" . $mac . "' and ip ='" . $filamac['ip'] . "'");
            foreach ($repe as $cuenta) {
                $contador++;
            }
            if ($filamac['con'] == null) {
                $conect = 1;
            } else {
                $conect = 0;
            }
            if ($contador > 0 && $conect == 1) {
                $consinc->query("DELETE FROM usuario_mac where usuario_id =" . $filaid['id']);
                $consinc->query("INSERT INTO usuario_mac VALUES(" . $filaid['id'] . ",'" . $mac . "','" . $filamac['ip'] . "'," . $conect . ")");
            } else {
                $consinc->query("INSERT INTO usuario_mac VALUES(" . $filaid['id'] . ",'" . $mac . "','" . $filamac['ip'] . "'," . $conect . ")");
            }
        }
    }
}
