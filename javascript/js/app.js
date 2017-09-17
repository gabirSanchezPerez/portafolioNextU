var Calculadora = {
  init: function(){

    valor1 = 0
    valor2 = 0
    operacionResuelta = false
    activacionPunto = false
    operacion = ""

    this.partesCalculadora()
    this.actualizarDisplay(valor1)
    this.eventos()
  },

  partesCalculadora: function(){
    pantalla = document.getElementById('display')
  },
  actualizarDisplay: function(resultado){
    pantalla.innerHTML = resultado
  },
  teclaDown: function(teclaClick){

    teclaString = teclaClick

    if (document.getElementById(teclaString)){
      document.getElementById(teclaString).style.transform = ("scale(0.9, 0.9)");
    }

  },
  teclaUp: function(teclaClick){

    teclaString = teclaClick
    if (document.getElementById(teclaString)) {
      document.getElementById(teclaString).style.transform = ("scale(1, 1)");
    }
  },
  eventos: function (){
    teclado = document.getElementsByClassName('tecla')
    for (i = 0;i < teclado.length; i++) {
      teclado[i].addEventListener("click", function(ev){
        var ad = this.id
        Calculadora.teclaDown(this.id);
        if(!isNaN(parseInt(this.id))  || this.id === "punto"){
          if(this.id == 'punto'){
            activacionPunto = true
          }
          Calculadora.asignarValor(parseInt(this.id));
          operacionResuelta = false

        }else{
          if(this.id === "on" || this.id === "sign" || this.id === "raiz"){

            Calculadora.operacionesAuxiliares(this.id);
          }else if(this.id  == "igual"){
            if(!operacionResuelta){

              valor2 = parseFloat(pantalla.innerHTML)
            }
            Calculadora.operaciones(true);
            operacionResuelta = true
          }else{
            if(operacion != ""){
              valor2 = parseFloat(pantalla.innerHTML)
              if(!operacionResuelta){
                Calculadora.operaciones(false)
              }
            }else{
              valor1 = parseFloat(pantalla.innerHTML)
            }

            operacion = this.id
            operacionResuelta = true
            pantalla.innerHTML = ""
          }
        }
        setTimeout(function () {
          Calculadora.teclaUp(ad);
        }, 100);
      });
    }
  },
  operacionesAuxiliares: function(operacionAux){
    switch (operacionAux) {
      case "sign":
        pantalla.innerHTML = -parseFloat(pantalla.innerHTML)
        break;

      case "on":
        valor1 = 0
        valor2 = 0
        this.actualizarDisplay(valor1);
        operacion = "";
        break;

      default:

    }
  },
  operaciones: function (refrescarPantalla){

    switch (operacion) {
      case "mas":
        valor1 += valor2;
        break;

      case "menos":
        valor1 -= valor2;
        break;
      case "por":
        valor1 = valor1 * valor2

        break;
      case "dividido":
        valor1 = valor1 / valor2

        break;
      case "sign":
        pantalla.innerHTML = -parseInt(pantalla.innerHTML)
        refrescarPantalla = !refrescarPantalla
        break;
      case "on":
        valor1 = 0
        valor2 = 0
        activacionPunto = false
        break;
      case "punto":

        break;
      // case "igual":
      //   pantalla.innerHTML = valor1 + parseInt(pantalla.innerHTML)
      //   break;
      default:

    }
    // console.log(refrescarPantalla+'---'+valor1.toString().length);
    if(refrescarPantalla){
      if (valor1.toString().length > 9){
        var posPunto = valor1.toString().indexOf(".")
        if(posPunto == -1){
          valor1 = parseFloat(valor1.toString().substring(0, 8))
        } else {
          valor1 = parseFloat(valor1.toString().substring(0, 9))
        }
      }
      this.actualizarDisplay(valor1);
    }
  },
  asignarValor: function(valor){
    // operacionActiva es true cuando presiono algun signo
    var nuevoValor = 0
    if(operacionResuelta){
      operacionResuelta = false
      nuevoValor = valor
    }else if(pantalla.innerHTML.length < 8 || (pantalla.innerHTML.length < 9 && pantalla.innerHTML.indexOf(".") != -1)){
      if(parseFloat(pantalla.innerHTML) == 0 && !activacionPunto && pantalla.innerHTML.indexOf(".") == -1){
        nuevoValor = valor
      }else{
        if (activacionPunto){
          activacionPunto = false
          if(pantalla.innerHTML.indexOf(".") == -1){
            nuevoValor = pantalla.innerHTML + '.'
          } else {
            nuevoValor = pantalla.innerHTML
          }
        }else {

          nuevoValor = pantalla.innerHTML + valor
        }
      }
    }else{
      nuevoValor = pantalla.innerHTML
    }
    if (nuevoValor.toString().length > 9){
      var posPunto = nuevoValor.toString().indexOf(".")
      nuevoValor = parseFloat(nuevoValor.toPrecision(8 - posPunto))
    }
    this.actualizarDisplay(nuevoValor);
  }
}

Calculadora.init()
