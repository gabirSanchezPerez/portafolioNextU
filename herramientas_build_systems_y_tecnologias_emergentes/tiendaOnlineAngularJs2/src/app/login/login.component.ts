import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpService } from './../servicios/http.service';

@Component({
  selector: 'ang2-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponent implements OnInit {
  public datoLogin: string[] = [] ;
  public show: string = 'hide';

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    if(parseInt(localStorage.getItem("currentUserIdAng")) > 0) {
      this.router.navigate(['/catalogo']);
    }
  }

  enviarFormulario(f) {

    var info = f.form._value;
    this.httpService.logearse(info.correo, info.contrasenia)
    .subscribe(
      (data) => { 
        let aux : any[] = [];
        for(let key in data){
          aux.push(data[key])
        }
        this.datoLogin = aux;
        if(this.datoLogin.length > 0){
          localStorage.setItem('currentUserIdAng', this.datoLogin[0]);
          this.router.navigate(['/catalogo']);
        } else {
          // console.log(this.datoLogin);
          this.show = "";
        }
      },
      (error) => { 
        console.log(error);
        return error
       }
  );
    
  }

}
