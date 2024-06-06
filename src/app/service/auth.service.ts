import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthDTO, AuthPayload, AuthRoles, ClientDTO, UserInfo} from "../models/auth.model";
import {StorageService} from "./storage.service";
import {jwtDecode} from "jwt-decode";
import {ReturnMessage} from "../models/exercise.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient,
              private storageService: StorageService,) { }
  authURL = 'http://localhost:3000/api/auth';

   getAccessLevel(role : string): boolean {
     const token = this.storageService.getUser();
     const tokenLocal = this.storageService.getUserLocalStorage();
     let tokenExist = tokenLocal? tokenLocal : token
     let authRoles: AuthRoles = jwtDecode(tokenExist);
     return authRoles.role === role;
   }

  register(data: ClientDTO | undefined, role: string) {

     return this.httpClient.post<ReturnMessage>(this.authURL+"/register", data, { headers: new HttpHeaders({'user_role': role}) });
   }


   login(data: AuthDTO) {
   return this.httpClient.post<AuthPayload>(this.authURL + "/login" , data);
  }

   home(data: AuthPayload) {
     const token = data.accessToken;
     let headers: HttpHeaders;
     headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + token
     });
     let options: { headers: HttpHeaders };
     options= { headers: headers };
    return this.httpClient.get<UserInfo>(this.authURL + "/profile",
       options
      );
  }
}
