import {Injectable, Self} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createNewSheet, SheetsModel} from "../data/sheets.model";
import {returnMessage} from "../data/exercise.model";
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
    return this.httpClient.post<returnMessage>(this.url, newSheet)
  }

}
