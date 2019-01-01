import { Component } from '@angular/core';
import { NavController,  AlertController,
         LoadingController,
        ToastController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  headers: Headers;
  url: string;
  peliculas: any[];
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

			this.getPeliculas(null);

  }

  dialogoAdd() {

  	 this.alertCtrl.create({
      title: "Añadir pelicula",
      message: "Ingresa los datos del nuevo usuario",
      inputs: [{
        name: "nombre",
        placeholder: "Nombre"
      },
      {
        name: "email",
        placeholder: "Email"
      },
      {
        name: "telefono",
        placeholder: "Teléfono"
      }],
      buttons: [{
        text: "Cancelar"
      }, {
        text: "Guardar",
        handler: data => {
          let loading = this.loadingCtrl.create({content: "guardando la información"});
          loading.present();
          this.url = "http://localhost:8080/lista/classes/pelicula";

          this.http.post(this.url, 
                  { nombre: data.nombre, email: data.email, telefono: data.telefono, imagen: "http://lorempixel.com/34/34", propietario: this.usuarioId },
                  {headers: this.headers})
            .map(res => res.json())
            .subscribe(res => {
              this.getPeliculas(null);
              loading.dismiss();
              this.toastCtrl.create({
                message: "El pelicula se ha creado exitosamente",
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

editPelicula(pelicula) {
   this.alertCtrl.create({
     title: "Editar Pelicula",
     message: "Modifica la información del pelicula aquí",
     inputs: [
       {
         name: "nombre",
         placeholder: "Nombre",
         value: pelicula.nombre
       },
       {
         name: "email",
         placeholder: "Email",
         value: pelicula.email
       },
       {
         name: "telefono",
         placeholder: "Teléfono",
         value: pelicula.telefono
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
          this.url = "http://localhost:8080/lista/classes/pelicula/"+pelicula.objectId;

          this.http.put(this.url, 
                  { nombre: data.nombre, email: data.email, telefono: data.telefono},
                  {headers: this.headers})
            .map(res => res.json())
            .subscribe(res => {
              loading.dismiss();
              this.toastCtrl.create({
                message: "El pelicula se ha creado exitosamente",
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
            })
         }
       }
     ]
   }).present();
 }


  deletePelicula(pelicula) {

    this.alertCtrl.create({
      title: "Elimiar Pelicula",
      message: "¿Esta seguro de eliminar a este pelicula ?",
      buttons: [{ text: "No" },
      { text: "Sí", handler: () => {
        let loading = this.loadingCtrl.create({content: "Actualizando información"});
        loading.present();

        this.url = "http://localhost:8080/lista/classes/pelicula/"+pelicula.objectId;
    
        this.http.delete(this.url, { headers: this.headers })
          .map(res => res.json())
          .subscribe(res => {
            loading.dismiss();
            this.toastCtrl.create({
              message: "El pelicula ha sido eliminado exitosamente",
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
          })  
      }}]

    }).present();

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

}
