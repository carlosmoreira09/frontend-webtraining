import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ClientsModel} from "../models/clients.model";
import {AuthRoles} from "../models/auth.model";
import {jwtDecode} from "jwt-decode";
import {StorageService} from "./storage.service";
import {Observable} from "rxjs";
import {ReturnMessage} from "../models/exercise.model";

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  private url: string = "http://localhost:3000/api/clients";

  constructor(@Self() private httpClient: HttpClient, private storageService: StorageService) {
  }

  listAllAthletas(): Observable<ClientsModel[]> {
    const token = this.storageService.getUser();
    const authRoles: AuthRoles = jwtDecode(token);
    return this.httpClient.get<ClientsModel[]>(this.url + "/" + authRoles.id);

  }

  create(newClient: any, id_user: number): Observable<ReturnMessage> {
    return this.httpClient.post<ReturnMessage>(this.url, newClient, {headers: new HttpHeaders({'id_user': id_user})});
  }
}
