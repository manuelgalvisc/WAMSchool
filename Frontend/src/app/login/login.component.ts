import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  loggedIn: boolean;
  private usuario : User;

  constructor(private authService: AuthService,private userService: UserService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.signIn();
    });
  }

  signIn(){
    if(this.loggedIn){
      this.usuario = new User();
      this.usuario.idGoogle = this.user.id;
      this.usuario.nombre = this.user.firstName;
      this.usuario.apellido = this.user.lastName;
      this.usuario.email = this.user.email;
      this.usuario.urlImagen = this.user.photoUrl;

       //enviamos la autenticacion al backend y esperamos
       this.userService.login(this.usuario).subscribe(
         response =>{
          console.log(response);
         }
       );
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
