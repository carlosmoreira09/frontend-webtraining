import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {createNewSheet, SheetsModel} from "../models/sheets.model";
import {ReturnMessage} from "../models/exercise.model";
import {Observable} from "rxjs";
import {AuthRoles} from "../models/auth.model";
import {jwtDecode} from "jwt-decode";
import {StorageService} from "./storage.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  private baseUrl: string = environment.baseUrl;
  constructor(@Self() private httpClient: HttpClient,
              private storageService: StorageService,) {
  }

  listSheets() {
    const token = this.storageService.getUser();
    const authRoles: AuthRoles = jwtDecode(token);
    return this.httpClient.get<SheetsModel[]>(this.baseUrl + "sheets/client/" + authRoles.id);
  }

  listSheetByClient(id_sheet: number) {
    return this.httpClient.get<SheetsModel>(this.baseUrl + "sheets/" + id_sheet);
  }

  addNewSheet(newSheet: createNewSheet): Observable<ReturnMessage> {
    const token = this.storageService.getUser();
    const authRoles: AuthRoles = jwtDecode(token);
    return this.httpClient.post<ReturnMessage>(this.baseUrl + "sheets", newSheet, {headers: new HttpHeaders({'id_user': authRoles.id})})
  }

  delete(id: number | undefined): Observable<any> {
    return this.httpClient.delete<ReturnMessage>(this.baseUrl + "sheets/" + id);
  }

}
