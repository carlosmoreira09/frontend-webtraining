import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthDTO, AuthPayload, AuthRoles, ClientDTO} from "../../models/auth.model";
import {StorageService} from "../storage/storage.service";
import {jwtDecode} from "jwt-decode";
import {ReturnMessage} from "../../models/exercise.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient,
              private storageService: StorageService,) {
  }

  getAccessLevel(role: string): boolean {
    const token = this.storageService.getUser();
    const tokenLocal = this.storageService.getUserLocalStorage();
    let tokenExist = tokenLocal ? tokenLocal : token
    let authRoles: AuthRoles = jwtDecode(tokenExist);
    return authRoles.role === role;
  }

  getUserId() {
    const token = this.storageService.getUser();
    const tokenLocal = this.storageService.getUserLocalStorage();
    let tokenExist = tokenLocal ? tokenLocal : token;
    let authRoles: AuthRoles = jwtDecode(tokenExist);
    return authRoles.id;
  }


  register(data: ClientDTO | undefined) {
    return this.httpClient.post<ReturnMessage>(this.baseUrl + "auth/register", data);
  }


  login(data: AuthDTO) {
    return this.httpClient.post<AuthPayload>(this.baseUrl + "auth/login", data);
  }

  home(data: AuthPayload) {
    const token = data.accessToken;
    const id_user = this.getUserId()
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    let options: { headers: HttpHeaders };
    options = {headers: headers};
    return this.httpClient.get<ClientDTO>(this.baseUrl + "auth/profile/" + id_user,
      options
    );
  }
}
