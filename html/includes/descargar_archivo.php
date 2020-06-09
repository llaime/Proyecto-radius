<?php
$alumno_id = $_GET['id'];
$archivo = "../entregas/$alumno_id/".$_GET['file'];
header("Content-disposition: attachment; filename=$archivo");
header("Content-type: application/pdf");
readfile($archivo);
?>