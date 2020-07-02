import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
  })

  export class UserService {

    private _User: User;
    //private _token: string;
  
    constructor(private http: HttpClient) { }
  
  
    public login(usuario:User):Observable<any>{
      
      const url = 'http://localhost:9000/login/signin';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      console.log(usuario);
      console.log(JSON.stringify(usuario));
      return this.http.post<any>(url,JSON.stringify(usuario),httpOptions);
    }
  }
  