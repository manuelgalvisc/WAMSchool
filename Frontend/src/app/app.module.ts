import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { RouterModule , Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ObjetoAprendizajeComponent } from './objeto-aprendizaje/objeto-aprendizaje.component';
import { HomeComponent } from './home/home.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { RegistarUsuarioComponent } from './registar-usuario/registar-usuario.component';
import { FooterComponent } from './footer/footer.component'

///Servicios
import { CategoriaService } from './services/categoria.service';
import { ObjetoAprendizajeService } from './services/objeto-aprendizaje.service';
import { ConsultasService } from './services/consultas.service';

const routes: Routes =[
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'crearOA', component: ObjetoAprendizajeComponent},
  {path: 'home', component: HomeComponent}

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
    FooterComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [
    CategoriaService,
    ObjetoAprendizajeService,
    ConsultasService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
