import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ObjetoAprendizajeComponent } from './objeto-aprendizaje/objeto-aprendizaje.component';
import { RouterModule , Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes =[
  {path: 'crearOA', component: ObjetoAprendizajeComponent}

];





import { ModalLoginComponent } from './modal-login/modal-login.component';
import { RegistarUsuarioComponent } from './registar-usuario/registar-usuario.component';

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
    RouterModule.forRoot(routes)
  ],
  providers: [
    FormsModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
