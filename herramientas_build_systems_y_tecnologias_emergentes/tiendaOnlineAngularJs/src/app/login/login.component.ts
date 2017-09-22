import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './../servicios/http.service';

@Component({
  selector: 'ang2-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponent implements OnInit {
  public datoLogin: string[] = [] ;

  constructor(private httpService: HttpService) { }

  ngOnInit() {

  }

  enviarFormulario(f) {

    var info = f.form._value;
    this.httpService.setDatos(info.correo, info.contrasenia)
    .subscribe(
      (data) => { 
        let aux : any[] = [];
        for(let key in data){
          aux.push(data[key])
        }
        this.datoLogin = aux;
       },
      (error) => { return error }
  );
    
  }
}
