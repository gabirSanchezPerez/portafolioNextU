import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/Storage";

@IonicPage()
@Component({
  selector: 'page-comentario',
  templateUrl: 'comentario.html',
})
export class ComentarioPage {

  headers: Headers;
  url: string;
  comentarios: any[];
  localStorage: Storage;
  usuarioId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public alertCtrl: AlertController,
   	public http: Http,
   	public loadingCtrl: LoadingController,
   	public toastCtrl: ToastController) {

  		this.headers = new Headers();
	  	this.headers.append("X-Parse-REST-API-Key", "restAPIKey");
	  	this.headers.append("X-Parse-Master-Key", "masterKey");
	  	this.headers.append("X-Parse-Application-Id", "Lista1");

	  	this.localStorage = new Storage(null);
	  	this.localStorage
	  		.get("usuarioId")
	  		.then((valor) => {
	  			this.usuarioId = valor;
	  			this.getComentarios(null);
	  		});
  }

  getComentarios(refresher) {
  	let loading = this.loadingCtrl.create({content: "cargando"});

    this.url = 'http://localhost:8080/lista/classes/comentario?where={"usuarioId":"'+this.usuarioId+'"}';
    this.http.get(this.url, { headers: this.headers })
      .map(res => res.json())
      .subscribe(res => {
      	loading.dismiss();
        this.comentarios = res.results;
        if (refresher !== null) {
          refresher.complete() 
        }
      }, err => {
      	loading.dismiss();
        this.alertCtrl.create({
          title: "Error",
          message: "Hubo un error al cargar los datos, inténtelo más tarde",
          buttons: [{ text: "Aceptar" }]
        });
      })
  }

editComentario(c) {
   this.alertCtrl.create({
     title: "Editar Comentario",
     message: "Modifica tucomentario aquí",
     inputs: [
       {
         name: "titulo",
         placeholder: "Titulo",
         value: c.titulo
       },
       {
         name: "descripcion",
         placeholder: "Comentario",
         value: c.descripcion
       }
     ],
     buttons: [
       {
         text: "Cancelar"
       },
       {
         text: "Guardar",
         handler: data => {
           let loading = this.loadingCtrl.create({content: "Actualizando información"});
          loading.present();
          this.url = "http://localhost:8080/lista/classes/comentario/"+c.objectId;

          this.http.put(this.url, 
                  { titulo: data.titulo, descripcion: data.descripcion},
                  {headers: this.headers})
            .map(res => res.json())
            .subscribe(res => {
              loading.dismiss();
              this.toastCtrl.create({
                message: "El comentario se ha modificado exitosamente",
                duration: 3000,
                position: "bottom"
              }).present();
              this.getComentarios(null);
            }, err => {
              loading.dismiss();
              this.toastCtrl.create({
                message: "Ha ocurrido un error, inténtelo de nuevo",
                duration: 3000,
                position: "bottom"
              }).present();
            })
         }
       }
     ]
   }).present();
 }


  deleteComentario(c) {

    this.alertCtrl.create({
      title: "Elimiar Comentario",
      message: "¿Esta seguro de eliminar a este Comentario ?",
      buttons: [{ text: "No" },
      { text: "Sí", handler: () => {
        let loading = this.loadingCtrl.create({content: "Eliminando información"});
        loading.present();

        this.url = "http://localhost:8080/lista/classes/comentario/"+ c.objectId;

        this.http.delete(this.url, { headers: this.headers })
          .map(res => res.json())
          .subscribe(res => {
            loading.dismiss();
            this.toastCtrl.create({
              message: "El Comentario ha sido eliminado exitosamente",
              duration: 3000,
              position: "bottom"
            }).present();
            this.getComentarios(null);
          }, err => {
          	console.log(err);
            loading.dismiss();
            this.toastCtrl.create({
              message: "Ha ocurrido un error, inténtelo de nuevo",
              duration: 3000,
              position: "bottom"
            }).present();
          })  
      }}]

    }).present();

  }



}
