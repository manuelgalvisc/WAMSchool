import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { RouterModule , Routes } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { YouTubePlayerModule } from '@angular/youtube-player';

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
import { CrearpaginaComponent } from './crearpagina/crearpagina.component';
import { ModalenlacesvideosComponent } from './modalenlacesvideos/modalenlacesvideos.component';
import { ComponenteyoutubeComponent } from './componenteyoutube/componenteyoutube.component';
import { ModalcargaarchivosComponent } from './modalcargaarchivos/modalcargaarchivos.component';
import { ActividadComponent } from './actividad/actividad.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { OpcionmultipleComponent } from './opcionmultiple/opcionmultiple.component';
import { PreguntaabiertaComponent } from './preguntaabierta/preguntaabierta.component';
import { EnunciadoComponent } from './enunciado/enunciado.component';
import { ElegirEnunciadoComponent } from './elegir-enunciado/elegir-enunciado.component';
import { VisorComponent } from './visor/visor.component';
import { EditarSeccionComponent } from './editar-seccion/editar-seccion.component';

///Servicios
import { CategoriaService } from './services/categoria.service';
import { ObjetoAprendizajeService } from './services/objeto-aprendizaje.service';
import { ConsultasService } from './services/consultas.service';
import { ModalService } from './services/modal.service';
import { UserService } from './services/user.service';
import { PaginaService } from './services/pagina.service';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { VisorService } from './services/visor.service';

const routes: Routes =[
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'crearOA', component: ObjetoAprendizajeComponent,},
  {path: 'home', component: HomeComponent},
  {path: 'registrar_usuario', component: RegistarUsuarioComponent},
  {path: 'politicas', component: PoliticasComponent},
  {path: 'editarOA', component: EditarObjetoAprendizajeComponent},
  {path: 'crearSeccion', component: SeccionComponent},
  {path: 'visorOA', component: VisorComponent},
  {path: 'editarSeccion', component: EditarSeccionComponent},
  {path: 'crearPagina', component: CrearpaginaComponent },
  {path: 'crearActividad', component: ActividadComponent,
    children: [
      {path: '1', component: CuestionarioComponent},
      {path: '2', component: AhorcadoComponent}
    ]
  }
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
    CrearpaginaComponent,
    ModalenlacesvideosComponent,
    ComponenteyoutubeComponent,
    ModalcargaarchivosComponent,
    EditarSeccionComponent,
    AhorcadoComponent,
    ActividadComponent,
    CuestionarioComponent,
    OpcionmultipleComponent,
    PreguntaabiertaComponent,
    EnunciadoComponent,
    ElegirEnunciadoComponent,
    EditarSeccionComponent,
    VisorComponent,
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
    YouTubePlayerModule,
    CommonModule,
  ],
  entryComponents: [
    ModalOaComponent,
    ModalenlacesvideosComponent,
    ComponenteyoutubeComponent,
    OpcionmultipleComponent,
    PreguntaabiertaComponent,
    EnunciadoComponent,
    ElegirEnunciadoComponent,
  ],
  providers: [
    CategoriaService,
    ObjetoAprendizajeService,
    ConsultasService,
    ModalService,
    UserService,
    DatePipe,
    PaginaService,
    VisorService,
  ],

  bootstrap: [AppComponent
  ]
})
export class AppModule { }
