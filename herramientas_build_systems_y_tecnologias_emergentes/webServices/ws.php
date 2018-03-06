<?php 

header('Access-Control-Allow-Origin: *');

$dato = $_REQUEST['query'];

// die(json_encode($_REQUEST));
if($dato == "login"){
	$json = file_get_contents('php://input');
	$objPost = json_decode($json);
	// Consulta de login
	require_once("conexion.php");
	$cone = new conexion();

	if(!empty($objPost)){ //ANGULAR 2
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

if($dato == "producto"){
	$id = $_REQUEST['id'];
	// Consulta de login
	require_once("conexion.php");
	$cone = new conexion();

	$resultado = $cone->seleccionar("SELECT p.* ", "FROM productos p", "  ", " WHERE p.id = " .$id);
	$rtaUsuario = array();

	if ($resultado->num_rows > 0) {
		while($row = $resultado->fetch_assoc()){
			$rtaUsuario = $row; 
		}
	}
	$resultado->close();
	 
	die(json_encode($rtaUsuario));
}

if($dato == "pedido"){
	$json = file_get_contents('php://input');
	$objPost = json_decode($json);

	// die(json_encode($objPost));
	// Consulta de login
	require_once("conexion.php");
	$cone = new conexion();
	$resultado = array();

	foreach ($objPost as $k => $v) {
	// echo "<pre>"; print_r($v);
		if(!empty($v)){
			$resultado[] = $cone->actualizar("UPDATE productos ", " SET cantidad = (cantidad - ".$v->cantidad_solicitada.")", " where productos.id = " .$v->id);
		} 
	}
	// die();
	$cone->cerrar();
	 
	die(json_encode($resultado));
}


 ?>
