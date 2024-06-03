import {Injectable, Self} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createNewSheet, SheetsModel} from "../models/sheets.model";
import {ReturnMessage} from "../models/exercise.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  private url: string = "http://localhost:3000/api/sheets";

  constructor(@Self() private httpClient: HttpClient) { }

  listSheets() {
    return this.httpClient.get<SheetsModel[]>(this.url)
  }

  addNewSheet(newSheet: createNewSheet): Observable<any> {
    return this.httpClient.post<ReturnMessage>(this.url, newSheet)
  }
  delete(id: number | undefined): Observable<any> {
    return this.httpClient.delete<ReturnMessage>(this.url + "/" + id);
  }

}
