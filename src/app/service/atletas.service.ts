import {Injectable, Self} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientsModel} from "../models/clients.model";
import {AuthRoles} from "../models/auth.model";
import {jwtDecode} from "jwt-decode";
import {StorageService} from "./storage.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AtletasService {

  private url: string = "http://localhost:3000/api/clients";
  constructor(@Self() private httpClient: HttpClient, private storageService: StorageService) { }

  listAllAthletas(): Observable<ClientsModel[]> {
    const token = this.storageService.getUser();
      const authRoles: AuthRoles = jwtDecode(token);
    return this.httpClient.get<ClientsModel[]>(this.url+ "/athletas/"+authRoles.id);

  }
}
