import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Headers, Http } from "@angular/http";
import { Storage } from "@ionic/Storage";

import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';
import { userModel } from '../../userModel';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuarioALoguear: userModel = {
    username: "",
    password: ""
  }

  url: string;
  headers: Headers;
  localStorage: Storage;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public alerta: AlertController,
  	public http: Http) {

	  	this.headers = new Headers();
	  	this.headers.append("X-Parse-REST-API-Key", "restAPIKey");
	  	this.headers.append("X-Parse-Master-Key", "masterKey");
	  	this.headers.append("X-Parse-Application-Id", "Lista1");
      this.localStorage = new Storage(null);
      this.localStorage
        .get("usuarioId")
        .then((valor) => {
          // console.log(valor);
          if(valor !== ""){

           this.navCtrl.setRoot(HomePage);
          }
        });
  }

  login() {
  	if (!(this.usuarioALoguear.username && this.usuarioALoguear.password)){
      this.alerta.create({
      	title: "Error", 
      	message: "Ningún campo puede ser vacío", 
      	buttons: [
      		{text: "Aceptar"}
      	]
      }).present()
      return;
    } else {
    	this.url = "http://localhost:8080/lista/login?username="+this.usuarioALoguear.username+"&password="+this.usuarioALoguear.password;

    	this.http.get(this.url, { headers: this.headers })
    		.map(res => res.json())
    		.subscribe(res => {
    			console.log(res)
          this.localStorage
            .set("usuarioId", res.objectId)
            .then(() => {
    			    this.navCtrl.setRoot(HomePage);
            });

    		}, err => {
    			console.log(err)
		      this.alerta.create({
		      	title: "Error", 
		      	message: "El usuario y/o la contraseña son incorrectos", 
		      	buttons: ["Aceptar"]
		      }).present()
    		}
    	)

    }
  }

  irARegisto() {
  	this.navCtrl.push(RegistroPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
