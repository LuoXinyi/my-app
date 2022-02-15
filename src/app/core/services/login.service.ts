import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(userName: string, password: string){
    return this.http.get(`http://127.0.0.1:8082/login?userName=${userName}&password=${password}`);
  }
}
