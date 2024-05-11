import {Injectable, Self} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SheetsModel} from "../data/sheets.model";

@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  private url: string = "http://localhost:3000/api/sheets";

  constructor(@Self() private httpClient: HttpClient) { }

  listSheets() {
    return this.httpClient.get<SheetsModel[]>(this.url)
  }

}
