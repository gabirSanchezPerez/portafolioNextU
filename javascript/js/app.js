var Calculadora = {
  init: function(){
    var resultado = 0
    valor1 = 0
    valor2 = 0
    operacionActiva= false,

    this.partesCalculadora()
    this.asignarValor(resultado)
    this.eventos()
  },
  partesCalculadora: function(){
    pantalla = document.getElementById('display')
  },
  actualizarDisplay: function(resultado){
    pantalla.innerHTML = resultado
  },
  eventos: function (){
    teclado = document.getElementsByClassName('tecla')
    for (i = 0;i < teclado.length; i++) {
      teclado[i].addEventListener("click", function(ev){
        if(!isNaN(parseInt(this.id))){
          Calculadora.asignarValor(parseInt(this.id));
        }else{
          Calculadora.operaciones(this.id);
        }
      });
    }
  },
  operaciones: function (operacion){
    switch (operacion) {
      case "mas":
        valor1 += parseInt(pantalla.innerHTML)
        operacionActiva = true
        break;
        
      case "menos":
        valor1 -= parseInt(pantalla.innerHTML)
        operacionActiva = true

        break;
      case "por":
        valor1 = valor1 * parseInt(pantalla.innerHTML)
        operacionActiva = true

        break;
      case "dividido":
        valor1 = valor1 / parseInt(pantalla.innerHTML)
        operacionActiva = true

        break;
      case "sign":
        pantalla.innerHTML = -parseInt(pantalla.innerHTML)

        break;
      case "on":
        this.actualizarDisplay(0);
        valor1 = 0
        valor2 = 0
        break;
      case "punto":

        break;
      case "igual":
        pantalla.innerHTML = valor1 + parseInt(pantalla.innerHTML)
        break;
      default:

    }
  },
  asignarValor: function(valor){
    if(operacionActiva){
      operacionActiva = false
      nuevoValor = valor
    }else if(pantalla.innerHTML.length < 8){
      var nuevoValor = 0
      if(parseInt(pantalla.innerHTML) == 0){
        nuevoValor = valor
      }else{
        nuevoValor = pantalla.innerHTML + valor
      }
    }
    this.actualizarDisplay(nuevoValor);
  }

}

Calculadora.init()
