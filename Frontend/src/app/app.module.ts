import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { RouterModule , Routes } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";


import { AppRoutingModule } from './app-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//environment
import { environment } from '../environments/environment';

//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ObjetoAprendizajeComponent } from './objeto-aprendizaje/objeto-aprendizaje.component';
import { HomeComponent } from './home/home.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { RegistarUsuarioComponent } from './registar-usuario/registar-usuario.component';
import { FooterComponent } from './footer/footer.component'
import { EditorTextoComponent } from './editor-texto/editor-texto.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { SeccionComponent } from './seccion/seccion.component';
import { EditarObjetoAprendizajeComponent } from './editar-objeto-aprendizaje/editar-objeto-aprendizaje.component';
import { ModalOaComponent } from './modal-oa/modal-oa.component';
///Servicios
import { CategoriaService } from './services/categoria.service';
import { ObjetoAprendizajeService } from './services/objeto-aprendizaje.service';
import { ConsultasService } from './services/consultas.service';
import { ModalService } from './services/modal.service';
import { UserService } from './services/user.service';

const routes: Routes =[
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'crearOA', component: ObjetoAprendizajeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registrar_usuario', component: RegistarUsuarioComponent},
  {path: 'politicas', component: PoliticasComponent},
  {path: 'editarOA', component: EditarObjetoAprendizajeComponent},
  {path: 'crearSeccion', component: SeccionComponent},
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
    PoliticasComponent,
    SeccionComponent,
    EditarObjetoAprendizajeComponent,
    EditorTextoComponent,
    ModalOaComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    QuillModule.forRoot(),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  entryComponents:[
    ModalOaComponent
  ],
  providers: [
    CategoriaService,
    ObjetoAprendizajeService,
    ConsultasService,
    ModalService,
    UserService,
    DatePipe,
  ],

  bootstrap: [AppComponent
  ]
})
export class AppModule { }
