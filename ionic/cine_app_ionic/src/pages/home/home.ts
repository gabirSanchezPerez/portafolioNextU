import { Component } from '@angular/core';
import { NavController,  AlertController,
         LoadingController,
        ToastController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/Storage";

import { ComentarioPage } from '../comentario/comentario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  headers: Headers;
  url: string;
  peliculas: any[];
  localStorage: Storage;
  usuarioId: string;

  constructor(
  	public navCtrl: NavController,
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
          
          this.getPeliculas(null);
        });


  }

  addComentario(p) {

  	 this.alertCtrl.create({
      title: "Añadir Comentario",
      message: "Escribe lo que piensas sobre esta pelicula",
      inputs: [{
        name: "titulo",
        placeholder: "Titulo"
      },
      {
        name: "comentario",
        placeholder: "Ingresa tu comentario"
      }],
      buttons: [{
        text: "Cancelar"
      }, {
        text: "Comentar",
        handler: data => {
          let loading = this.loadingCtrl.create({content: "guardando comentario"});
          loading.present();
          this.url = "http://localhost:8080/lista/classes/comentario";

          this.http.post(this.url, 
                  { titulo: data.titulo, descripcion: data.comentario, p_titulo: p.titulo, p_imagen: p.imagen, usuarioId: this.usuarioId },
                  {headers: this.headers})
            .map(res => res.json())
            .subscribe(res => {
              //this.getPeliculas(null);
              loading.dismiss();
              this.toastCtrl.create({
                message: "El comentario se ha gardado exitosamente",
                duration: 4000,
                position: "bottom"
              }).present();
            }, err => {
              loading.dismiss();
              this.toastCtrl.create({
                message: "Ha ocurrido un error, inténtelo de nuevo",
                duration: 4000,
                position: "bottom"
              }).present();
            })
        }
      }]
    }).present()


  }

  getPeliculas(refrescar) {
  	let loading = this.loadingCtrl.create({content: "cargando"});

    this.url = 'http://localhost:8080/lista/classes/pelicula';
    this.http.get(this.url, { headers: this.headers })
      .map(res => res.json())
      .subscribe(res => {
      	loading.dismiss();
        this.peliculas = res.results;
        if (refrescar !== null) {
          refrescar.complete() 
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

  favorita(pelicula, estado) {

    let loading = this.loadingCtrl.create({content: "Actualizando información"});
    loading.present();

    this.url = "http://localhost:8080/lista/classes/pelicula/"+pelicula.objectId;

    this.http.put(this.url, { favorito: estado}, { headers: this.headers })
      .map(res => res.json())
      .subscribe(res => {
        loading.dismiss();
        this.toastCtrl.create({
          message: "El pelicula ha sido modificado exitosamente",
          duration: 3000,
          position: "bottom"
        }).present();
        this.getPeliculas(null);
      }, err => {
        loading.dismiss();
        this.toastCtrl.create({
          message: "Ha ocurrido un error, inténtelo de nuevo",
          duration: 3000,
          position: "bottom"
        }).present();
      }
    )

  }

  irAComentarios() {
    this.navCtrl.push(ComentarioPage);
  }

}
