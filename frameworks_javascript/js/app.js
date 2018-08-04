var tablero;
var coincidencias;

$(document).ready(function() {

  // Obtiene la img para luego intarla en el tablero
  construirTablero()
  activarAnimacionTitulo()
  $(".img_tablero").click( function () {
  	 parpadear(this)
  });
  $(".img_tablero").draggable({
  	opacity: 0.7 ,
  	axis: "y",
  	cursor: "pointer",
  	refreshPositions: true,
  	// grid: [ 50, 20 ],
  	zIndex: 100,
  	containment: ".panel-tablero",
  })

  revisarCombinacionVertical()
  revisarCombinacionHorizontal()

});

function construirTablero() {
  let vertical = new Array(6)
  for (let v = 0; v < 7; v++) {

    let horizontal = new Array(6)
    for (let h = 0; h < 7; h++) {

      horizontal[h] = " <img class='img_tablero' src='image/" + obtenerImagen() + "' title='' style=' width: 80%' >"
      $(".col-" + (h + 1)).append(horizontal[h])
    }
    vertical[v] = horizontal
  }
  tablero = vertical
}

function obtenerImagen() {

  let imagenes = new Array("1.png", "2.png", "3.png", "4.png")
  let indice = Math.floor(Math.random() * 4)
  return imagenes[indice]
}

function activarAnimacionTitulo() {
  estado = true
  setInterval(animarTitulo, 1000)
}

function animarTitulo() {
  if (estado) {

    $(".main-titulo").animate({
      color: "##DCFF0E",
    }, 50);

  } else {

    $(".main-titulo").animate({
      color: "#FFFFFF",
    }, 50);
  }
  estado = !estado
}

function revisarCombinacionVertical() {
	// console.log(tablero)
	let imgAux = ""
	for (var c = 0; c < 7; c++) {
		let coincidencia = 1

		for (var f = 0; f < 7; f++) {
			if(f == 0) {
				imgAUx = tablero[f][c]
			} else if (imgAUx == tablero[f][c]){
				coincidencia++
				if (coincidencia > 2) {
					console.log('Vertical ' + c + ' C <> F ' + f + ' - ' + tablero[f][c])
					coincidencias
				} 
			} else {
				coincidencia = 1
				imgAUx = tablero[f][c]
			}
		}
	}

}

function revisarCombinacionHorizontal() {
	// console.log(tablero)
	for (var f = 0; f < 7; f++) {
		let coincidencia = 1

		for (var c = 0; c < 7; c++) {
			if(c == 0) {
				imgAUx = tablero[f][c]
			} else if (imgAUx == tablero[f][c]) {
				coincidencia++
				if (coincidencia > 2) {
					console.log('Horizontal ' + f + ' F <> C ' + c + ' - ' + tablero[f][c])
				} 
			} else {
				coincidencia = 1
				imgAUx = tablero[f][c]
			}
		}
	}
}

function coindecidencia () {

}

function parpadear(obj) {
	
	console.log(obj)

	$(obj).next().fadeToggle('fast')
	$(obj).next().fadeToggle('fast')
	$(obj).next().fadeToggle('fast')
	$(obj).next().fadeToggle('fast')
	$(obj).next().fadeToggle('fast')
	setTimeout(function(){
		$(obj).next().remove()
	}, 1000)
}