<?php

header('Access-Control-Allow-Origin: *');

$json = file_get_contents('php://input');
$objPost = json_decode($json);

// Consulta de login
require_once("conexion.php");
$cone = new conexion();

$resultado = $cone->seleccionar("SELECT * ", "FROM usuarios u", " where (u.usuario = '" .$objPost->correo . "' OR correo = '" .$objPost->correo . "' ) AND contrasenia = '" . $objPost->contrasenia . "' ");
$rtaUsuario = array();

if ($resultado->num_rows > 0) {

    $rtaUsuario = $resultado->fetch_assoc();

  }
  $resultado->close();
  
  die(json_encode($rtaUsuario));

 ?>
