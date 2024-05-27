import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthDTO, AuthPayload} from "../data/auth.model";
import {BehaviorSubject, tap} from "rxjs";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private sessionStorage: StorageService) { }
  private payload: AuthPayload;
  private token: string;
  authURL = 'http://localhost:3000/api/auth';

   login(data: AuthDTO) {
   return this.httpClient.post<AuthPayload>(this.authURL + "/login" , data);
  }

   home(data: AuthPayload) {

     const token = data.accessToken;
     let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + token });
     let options = { headers: headers };
    return this.httpClient.get(this.authURL + "/profile",
       options
      );
  }
}
