import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {createNewSheet, SheetsModel} from "../models/sheets.model";
import {ReturnMessage} from "../models/exercise.model";
import {Observable} from "rxjs";
import {AuthRoles} from "../models/auth.model";
import {jwtDecode} from "jwt-decode";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  private url: string = "http://localhost:3000/api/sheets";

  constructor(@Self() private httpClient: HttpClient,
              private storageService: StorageService,) { }

  listSheets() {
    const token = this.storageService.getUser();
    const authRoles: AuthRoles = jwtDecode(token);
    return this.httpClient.get<SheetsModel[]>(this.url+"/client/"+authRoles.id);
  }

  addNewSheet(newSheet: createNewSheet): Observable<ReturnMessage> {
    const token = this.storageService.getUser();
    const authRoles: AuthRoles = jwtDecode(token);
    return this.httpClient.post<ReturnMessage>(this.url, newSheet, { headers: new HttpHeaders({ 'id_user': authRoles.id})})
  }
  delete(id: number | undefined): Observable<any> {
    return this.httpClient.delete<ReturnMessage>(this.url + "/" + id);
  }

}
