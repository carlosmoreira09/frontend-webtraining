import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthDTO, AuthPayload, AuthRoles} from "../models/auth.model";
import {StorageService} from "./storage.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient,
              private storageService: StorageService,) { }
  authURL = 'http://localhost:3000/api/auth';

   getAccessLevel(role : string): boolean {
     const token = this.storageService.getUser();
     if(token){
       const authRoles: AuthRoles = jwtDecode(token)
       if(authRoles.role === role) {
         return true;
       }
     }
     return false;
   }


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
