<?php

header('Access-Control-Allow-Origin: *');
$dato = $_REQUEST['query'];

if($dato == "login"){
	$json = file_get_contents('php://input');
	$objPost = json_decode($json);

	// Consulta de login
	require_once("conexion.php");
	$cone = new conexion();

	if(!empty($objPost)){
		$resultado = $cone->seleccionar("SELECT * ", "FROM usuarios u", " where (u.usuario = '" .$objPost->correo . "' OR correo = '" .$objPost->correo . "' ) AND contrasenia = '" . $objPost->contrasenia . "' ");
	} else {
		$resultado = $cone->seleccionar("SELECT * ", "FROM usuarios u", " where (u.usuario = '" .$_REQUEST['correo'] . "' OR correo = '" .$_REQUEST['correo'] . "' ) AND contrasenia = '" . $_REQUEST['contrasenia'] . "' ");

	}
	$rtaUsuario = array();

	if ($resultado->num_rows > 0) {
		$rtaUsuario = $resultado->fetch_assoc();
	}
	$resultado->close();
	 
	die(json_encode($rtaUsuario));
}

if($dato == "productos"){
	// Consulta de login
	require_once("conexion.php");
	$cone = new conexion();

	$resultado = $cone->seleccionar("SELECT * ", "FROM productos p", "  ");
	$rtaUsuario = array();

	if ($resultado->num_rows > 0) {
		while($row = $resultado->fetch_assoc()){
			$rtaUsuario[] = $row; 
		}
	}
	$resultado->close();
	 
	die(json_encode($rtaUsuario));
}


 ?>
