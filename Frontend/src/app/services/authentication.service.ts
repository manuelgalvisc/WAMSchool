import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationService {
  userData: Observable<firebase.User>;
  userState: any;

  constructor(public afAuth: AngularFireAuth,
              private _modalService: ModalService,
              public userService: UserService) {
    this.userData = afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  //Signup
  SingnUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('Registro exitoso', res);
    }).catch(error => {
      console.log('Algo salio mal: ', error.message);
    });
  }

  //Auth provider
  async AuthLogin(provider: any) {
    try {
      const res = await this.afAuth.signInWithPopup(provider);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  //Sign-in con Google
  GoogleAuth() {
    this.AuthLogin(new auth.GoogleAuthProvider);
    this._modalService.cerrarModal();
    this.userService.inOut = true;
  }

  //Sign-in con email/password
  SignIn(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Sing In con exito');
    }).catch(error => {
      console.log('Algo salio mal: ', error.message);
    });
  }

  //Eliminar localStorage
  SignOut() {
    this.afAuth.signOut();
    localStorage.removeItem('user');

  }

  cerrarModal() {
    this._modalService.cerrarModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
