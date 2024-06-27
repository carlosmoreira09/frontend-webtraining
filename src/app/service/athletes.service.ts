import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ClientsModel} from "../models/clients.model";
import {AuthRoles} from "../models/auth.model";
import {jwtDecode} from "jwt-decode";
import {StorageService} from "./storage.service";
import {Observable} from "rxjs";
import {ReturnMessage} from "../models/exercise.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  private baseUrl: string = environment.baseUrl;

  constructor(@Self() private httpClient: HttpClient, private storageService: StorageService) {
  }

  getOptions() {
    return [
      {name: 'Peito', abbrev: 'peito'},
      {name: 'Biceps/AnteBraço', abbrev: 'braco'},
      {name: 'Costas', abbrev: 'costas'},
      {name: 'Abdomen', abbrev: 'abdomen'},
      {name: 'Posterior', abbrev: 'posterior'},
      {name: 'Quadriceps', abbrev: 'pernas'},
      {name: 'Fortalecimento', abbrev: 'fortalecimento'},
    ];
  }

  listAllAthletas(): Observable<ClientsModel[]> {
    const token = this.storageService.getUser();
    const authRoles: AuthRoles = jwtDecode(token);
    return this.httpClient.get<ClientsModel[]>(this.baseUrl + "clients/" + authRoles.id);
  }

  saveAddSheetAthlete(id_sheet: number, id_client: number): Observable<ReturnMessage> {
    const header = new HttpHeaders({'id_client': id_client})
    return this.httpClient.post<ReturnMessage>(this.baseUrl + "clients/sheets/" + id_sheet, '', {
      headers: header
    });
  }

  delete(id: number | undefined): Observable<ReturnMessage> {
    return this.httpClient.delete<ReturnMessage>(this.baseUrl + "clients/" + id);
  }

  updateAthlete(updateClient: any): Observable<ReturnMessage> {
    return this.httpClient.put<ReturnMessage>(this.baseUrl + "clients", updateClient)
  }

  create(newClient: any): Observable<ReturnMessage> {
    const token = this.storageService.getUser();
    const authRoles: AuthRoles = jwtDecode(token);
    return this.httpClient.post<ReturnMessage>(this.baseUrl + "clients", newClient, {headers: new HttpHeaders({'id_user': authRoles.id})});
  }
}
