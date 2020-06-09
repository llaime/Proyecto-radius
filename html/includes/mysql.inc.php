<?php
	function Conexion($host,$user,$pass,$bd){
		$c = new mysqli($host, $user, $pass, $bd);
		if ($c->connect_errno){
			return null;
		}else{
			$c->set_charset("utf8");
			return $c;
		}
	}
	
	function Cierre($c){
		$c->close();	
	}
	
	function ConsultaIDU($c,$sql){
		if ($c->query($sql) == TRUE){
			return 1;
		}else{
			return 0;	
		}
	}
	
	function Seleccion($c,$sql){
		if (($resultado = $c->query($sql)) == TRUE){
			if ($resultado->num_rows > 0 ){
				while ($fila = $resultado->fetch_array()){
					$datos[] = $fila;
				}
			}else{
				$datos = null;				
			}
		}else{
			$datos = 0;	
		}
		return $datos;
	}
?>