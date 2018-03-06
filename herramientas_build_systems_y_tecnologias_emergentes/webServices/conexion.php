<?php

class conexion {

     private $servidor = "localhost";
     private $usuario = "root";
     private $contrasena = "";
     private $baseDatos = "hrtas_emegentes";
     public $link;

     function __construct() {
          $this->link = new mysqli($this->servidor, $this->usuario, $this->contrasena, $this->baseDatos);
          if ($this->link === false) {
               die("ERROR: No se puede conectar al servidor" . mysqli_connect_error());
          }
     }

     public function seleccionar($select = "", $from = "", $where = "", $inner = "") {

          $sql = $select . " " . $from . " " . $inner . " " . $where;
//          echo $sql." \n ";
          $result = $this->link->query($sql);
//          print_r($result);die();
          if ($this->link === false) {
               die("ERROR: No se puede conectar al servidor" . mysqli_connect_error());
          }
          return $result;
     }

     public function insertar($insert = "", $campos = "", $valores = "") {
          $sql = $insert . " " . $campos . " " . $valores;
          //echo $sql;
          $result = $this->link->query($sql);
          if ($this->link === false) {
               die("ERROR: No se puede conectar al servidor" . mysqli_connect_error());
          }
          return $result;
     }

     public function actualizar($update = "", $set = "", $where = "") {
          $sql = $update . " " . $set . " " . $where;
          // die($sql);
          $result = $this->link->query($sql);
          return $result; //
     }

     public function eliminar($update = "", $set = "", $where = "") {
          $sql = $update . " " . $set . " " . $where;
//		print_r($sql);
          $result = $this->link->query($sql);
          return $result;
     }

     public function cerrar() {
          $this->link->close();
     }

}

?>