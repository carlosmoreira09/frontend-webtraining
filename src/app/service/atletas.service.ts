import {Injectable, Self} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientsModel} from "../data/clients.model";

@Injectable({
  providedIn: 'root'
})
export class AtletasService {

  private url: string = "http://localhost:3000/api/clients";
  constructor(@Self() private httpClient: HttpClient) { }

  listAllAthletas() {
    return this.httpClient.get<ClientsModel[]>(this.url);
  }
}
