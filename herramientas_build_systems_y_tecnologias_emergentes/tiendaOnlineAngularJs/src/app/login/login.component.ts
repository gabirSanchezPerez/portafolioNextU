import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './../servicios/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ang2-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponent implements OnInit {
  public datoLogin: string[] = [] ;

  constructor(private httpService: HttpService, private router: Router) { }

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
        if(this.datoLogin.length > 0){
          this.router.navigate(['/catalogo']);
        }
        // console.log(this.datoLogin);
       },
      (error) => { return error }
  );
    
  }
}
