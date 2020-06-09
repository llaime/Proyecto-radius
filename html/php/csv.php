<?php
include "../includes/conexion.inc.php";
include "../includes/mysql.inc.php";
include "../includes/utiles.inc.php";

function pass()
{
    $caracteres  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    $longpalabra = 8;
    for ($pass = '', $n = strlen($caracteres) - 1; strlen($pass) < $longpalabra;) {
        $x = rand(0, $n);
        $pass .= $caracteres[$x];
    }
    return $pass;
}
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
    $Qbom = true;
//por cada fila hago un array
    foreach ($fichero as $fila) {
        if ($fila[0] != null) {
            //meto el valor de las celdas en un array
            list($grupo, $usuario) = $fila;
            //para el primer grupo, lo inserto y puedo empezar el conteo de grupos
            if ($Qbom) {
                $Qbom   = false;
                $grupos = [BOM($grupo)];
                $sqlg   = "INSERT INTO grupo VALUES(null,'" . BOM($grupo) . "')";
                $con->query($sqlg);
            }
            //conteo de grupos e inserto los grupos
            for ($i = 0; $i < count($grupos); $i++) {
                if ($grupos[$i] == BOM($grupo)) {
                    break;
                } else if ($i == count($grupos) - 1) {
                    array_push($grupos, BOM($grupo));
                    $sqlg = "INSERT INTO grupo VALUES(null,'" . BOM($grupo) . "')";
                    if ($con->query($sqlg) === true) {

                    } else {
                        echo "Error: " . $sqlg . "<br>" . $con->error;
                    }
                }

            }
            //inserto usuarios
            $sql = "INSERT INTO usuario VALUES(null,'" . $usuario . "','" . pass() . "')";
            if ($con->query($sql) === true) {
            } else {
                echo "Error: " . $sql . "<br>" . $con->error;

            }
            //inserto relacion usuario grupo
            $sql   = "select usuario.id as uid, grupo.id as gid from usuario,grupo where usuario.nombre = '" . $usuario . "' and grupo.nombre = '" . BOM($grupo) . "' ";
            $datos = $con->query($sql);
            foreach ($datos as $fila) {
                $sqlr = "insert into usuario_grupo values(" . $fila['uid'] . "," . $fila['gid'] . ")";
                if ($con->query($sqlr) === true) {

                } else {
                    echo "Error: " . $sqlg . "<br>" . $con->error;
                }
            }

        }
    }
    header('Location:' . $_SERVER['HTTP_REFERER']);

} else {
    header('Location:' . $_SERVER['HTTP_REFERER']);
}
