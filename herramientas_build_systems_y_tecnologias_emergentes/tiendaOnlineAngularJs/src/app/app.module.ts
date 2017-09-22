import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { HttpService } from './servicios/http.service';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
