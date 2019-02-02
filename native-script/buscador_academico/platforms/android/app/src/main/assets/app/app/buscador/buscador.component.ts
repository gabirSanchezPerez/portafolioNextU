import { Component, OnInit } from "@angular/core";

import { Buscar } from "../servicios/buscador";
import { BuscadorService } from "../servicios/buscador.service";

@Component({
    selector: "ns-buscador",
    moduleId: module.id,
    templateUrl: "./buscador.component.html",
})
export class BuscadorComponent implements OnInit {
    items: Buscar[];

    constructor(private buscadorService: BuscadorService) { }

    ngOnInit(): void {
        
        
    }

    buscarUniversiad() {
        this.items = this.buscadorService.getUniversidad("middle");
    }

    buscarme () {

    }
}