var Calculadora = {
  init: function(){
    resultado = 0
    valor1 = 0
    valor2 = 0
    operacionResuelta = false
    operacion = ""

    document.onkeydown = this.teclaDown;
    document.onkeyup = this.teclaUp;
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
  teclaDown: function(event, teclaClick){

    if(teclaClick === undefined){
      tecla = event.which || event.keyCode
      teclaString = String.fromCharCode(tecla)
    }else{
      teclaString = teclaClick

    }
    if(document.getElementById(teclaString)){
      document.getElementById(teclaString).style.transform = ("perspective(700px) rotateX(15deg) rotateY(0deg)");
    }else{
      console.log(tecla);
      switch (teclaString) {
        case "+":
        document.getElementById("mas").style.transform = ("perspective(700px) rotateX(15deg) rotateY(0deg)");
          break;
        case "-":
        document.getElementById("menos").style.transform = ("perspective(700px) rotateX(15deg) rotateY(0deg)");
          break;
        case "*":
        document.getElementById("por").style.transform = ("perspective(700px) rotateX(15deg) rotateY(0deg)");
          break;
        case "/":
        document.getElementById("dividido").style.transform = ("perspective(700px) rotateX(15deg) rotateY(0deg)");
          break;
        case "=":
        document.getElementById("igual").style.transform = ("perspective(700px) rotateX(15deg) rotateY(0deg)");
          break;
        case ".":
        document.getElementById("punto").style.transform = ("perspective(700px) rotateX(15deg) rotateY(0deg)");
          break;
        default:

      }
    }

  },
  teclaUp: function(event, teclaClick){
    if(teclaClick === undefined){
      tecla = event.which || event.keyCode
      teclaString = String.fromCharCode(tecla)
    }else{
      teclaString = teclaClick

    }
    if(document.getElementById(teclaString)){
      document.getElementById(teclaString).style.transform = ("perspective(700px) rotateX(0deg) rotateY(0deg)");
    }else{

      switch (teclaString) {
        case "+":
        document.getElementById("mas").style.transform = ("perspective(700px) rotateX(0deg) rotateY(0deg)");
          break;
        case "-":
        document.getElementById("menos").style.transform = ("perspective(700px) rotateX(0deg) rotateY(0deg)");
          break;
        case "*":
        document.getElementById("por").style.transform = ("perspective(700px) rotateX(0deg) rotateY(0deg)");
          break;
        case "/":
        document.getElementById("dividido").style.transform = ("perspective(700px) rotateX(0deg) rotateY(0deg)");
          break;
        case "=":
        document.getElementById("igual").style.transform = ("perspective(700px) rotateX(0deg) rotateY(0deg)");
          break;
        case ".":
        document.getElementById("punto").style.transform = ("perspective(700px) rotateX(0deg) rotateY(0deg)");
          break;
        default:

      }
    }
  },
  eventos: function (){
    teclado = document.getElementsByClassName('tecla')
    for (i = 0;i < teclado.length; i++) {
      teclado[i].addEventListener("click", function(ev){
        var ad = this.id
        Calculadora.teclaDown(ev, this.id);
        if(!isNaN(parseInt(this.id))  || this.id === "punto"){
          Calculadora.asignarValor(parseInt(this.id));
          operacionResuelta = false

        }else{
          if(this.id === "on" || this.id === "sign" || this.id === "raiz"){

            Calculadora.operacionesAuxiliares(this.id);
          }else if(this.id === "igual"){
            if(!operacionResuelta){

              valor2 = parseInt(pantalla.innerHTML)
            }
            Calculadora.operaciones(true);
            operacionResuelta = true
          }else{
            if(operacion != ""){
              valor2 = parseInt(pantalla.innerHTML)
              if(!operacionResuelta){
                Calculadora.operaciones(false)
              }
            }else{
              valor1 = parseInt(pantalla.innerHTML)
            }

            operacion = this.id
            operacionResuelta = true
          }
        }
        setTimeout(function () {
          console.log("aqui " + ad);
          Calculadora.teclaUp(ev, ad);
        }, 100);
      });
    }
  },
  operacionesAuxiliares: function(operacionAux){
    switch (operacionAux) {
      case "sign":
        pantalla.innerHTML = -parseInt(pantalla.innerHTML)
        break;

      case "on":
        valor1 = 0
        valor2 = 0
        this.actualizarDisplay(valor1);
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
        break;
      case "punto":

        break;
      // case "igual":
      //   pantalla.innerHTML = valor1 + parseInt(pantalla.innerHTML)
      //   break;
      default:

    }
    if(refrescarPantalla){
      this.actualizarDisplay(valor1);
    }
  },
  asignarValor: function(valor){
    // operacionActiva es true cuando presiono algun signo
    if(operacionResuelta){
      operacionResuelta = false
      nuevoValor = valor
    }else if(pantalla.innerHTML.length < 8){
      var nuevoValor = 0
      if(parseInt(pantalla.innerHTML) == 0){
        nuevoValor = valor
      }else{
        nuevoValor = pantalla.innerHTML + valor
      }
    }else{
      nuevoValor = pantalla.innerHTML
    }
    this.actualizarDisplay(nuevoValor);
  }

}

Calculadora.init()
