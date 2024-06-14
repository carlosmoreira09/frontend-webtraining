import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExerciseModel} from "../models/exercise.model";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private url: string = "http://localhost:3000/api/exercises";

  constructor(@Self() private httpClient: HttpClient,
              private authService: AuthService) { }

  listExerciseByType(type: string) {
    const id_user = this.authService.getUserId();
    const header = new HttpHeaders({ 'id_user': id_user})
    return this.httpClient.get<ExerciseModel[]>(this.url + "/" + type,{
       headers: header
    });
  }
  addExercise(newExercise: ExerciseModel): Observable<any> {
    const id_user = this.authService.getUserId();
    const header = new HttpHeaders({ 'id_user': id_user})
    return this.httpClient.post(this.url, newExercise,  { headers: header
    });
  }

  deleteExercise(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.url+ "/" + id);
  }
}
