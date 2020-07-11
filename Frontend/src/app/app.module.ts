import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { RouterModule , Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ObjetoAprendizajeComponent } from './objeto-aprendizaje/objeto-aprendizaje.component';
import { HomeComponent } from './home/home.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { RegistarUsuarioComponent } from './registar-usuario/registar-usuario.component';

const routes: Routes =[
  {path: 'crearOA', component: ObjetoAprendizajeComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ObjetoAprendizajeComponent,
    HomeComponent,
    ModalLoginComponent,
    RegistarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [ ],

  bootstrap: [AppComponent]
})
export class AppModule { }
