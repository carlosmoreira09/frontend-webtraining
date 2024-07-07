import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ClientsModel} from "../../models/clients.model";
import {Observable} from "rxjs";
import {ReturnMessage} from "../../models/exercise.model";
import {environment} from "../../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  private baseUrl: string = environment.baseUrl;

  constructor(@Self() private httpClient: HttpClient,
              private authService: AuthService) {
  }


  listAllAthletas(): Observable<ClientsModel[]> {
    const id_user = this.authService.getUserId();
    return this.httpClient.get<ClientsModel[]>(this.baseUrl + "clients/" + id_user);
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
    const addClient = { ...newClient, id_user: this.authService.getUserId() };
    return this.httpClient.post<ReturnMessage>(this.baseUrl + "clients", addClient);
  }
}
