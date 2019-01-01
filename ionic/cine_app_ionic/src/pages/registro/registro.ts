import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';

import { userModel } from '../../userModel';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})

export class RegistroPage {

  usuarioARegistrar: userModel = {
    username: "",
    password: "",
    name: "",
    phone: "",
    email: ""
  }

  confirmarContrasena: string;
  url: string;
  headers: Headers;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public alerta: AlertController,
  	public http: Http) {
  	
  	this.headers = new Headers();
  	this.headers.append("X-Parse-REST-API-Key", "restAPIKey");
  	this.headers.append("X-Parse-Master-Key", "masterKey");
  	this.headers.append("X-Parse-Application-Id", "Lista1");
  }

  registrar() {
  	if(this.confirmarContrasena != this.usuarioARegistrar.password) {
  		this.alerta.create({
  			title: "Error",
  			message: "Las contraseñas no son iguales",
  			buttons: ['Aceptar']
  		}).present();
  		return;
  	}
  	this.url = "http://localhost:8080/lista/users";

  	this.http.post(this.url, this.usuarioARegistrar, {headers: this.headers })
  		.map(res => res.json())
  		.subscribe(res =>  {
  			this.alerta.create({
				title: "Usuario Registrado",
				message: "El usuario se ha registrado exitosamente."+
				"Regrese al login para ingresar al sistema.",
				buttons: [{
					text: "iniciar Sesión",
					handler: () => {
						this.navCtrl.pop();
					}
				}]
			}).present();
			
  		}, err => {
  			this.alerta.create({
				title: "Error",
				message: err.text(),
				buttons: [{
					text: "Aceptar",
				}]
			}).present();
  		})

  }

  irALogin() {
  	this.navCtrl.pop();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RegistroPage');
  // }

}
