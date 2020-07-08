import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from './user'

@Injectable({
    providedIn: 'root'
  })

  export class UserService {

    private User: User;

    constructor(private http: HttpClient) { }


    public login(usuario:User):Observable<any>{

      const url = 'http://localhost:9000/login/signin';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      return this.http.post<any>(url,JSON.stringify(usuario),httpOptions);
    }
  }
