import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {createNewSheet, SheetsModel} from "../../models/sheets.model";
import {ReturnMessage} from "../../models/exercise.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  private baseUrl: string = environment.baseUrl;

  constructor(@Self() private httpClient: HttpClient,
              private authService: AuthService) {
  }

  listSheets() {
    const id_user = this.authService.getUserId()
    return this.httpClient.get<SheetsModel[]>(this.baseUrl + "sheets/client/" + id_user);
  }

  updateSheet(updateSheet: createNewSheet): Observable<ReturnMessage> {
    return this.httpClient.put<ReturnMessage>(this.baseUrl + "sheets", updateSheet);
  }


  addNewSheet(newSheet: createNewSheet): Observable<ReturnMessage> {
    const addSheet = { ...newSheet, id_user: this.authService.getUserId() };

    return this.httpClient.post<ReturnMessage>(this.baseUrl + "sheets", addSheet);
  }

  delete(id: number | undefined): Observable<any> {
    return this.httpClient.delete<ReturnMessage>(this.baseUrl + "sheets/" + id);
  }

}
