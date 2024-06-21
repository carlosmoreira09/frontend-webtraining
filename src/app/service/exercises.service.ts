import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExerciseModel} from "../models/exercise.model";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private baseUrl: string = environment.baseUrl;

  constructor(@Self() private httpClient: HttpClient,
              private authService: AuthService) {
  }

  listExerciseByType(type: string) {
    const id_user = this.authService.getUserId();
    const header = new HttpHeaders({'id_user': id_user})
    return this.httpClient.get<ExerciseModel[]>(this.baseUrl + "/" + type, {
      headers: header
    });
  }

  addExercise(newExercise: ExerciseModel): Observable<any> {
    const id_user = this.authService.getUserId();
    const header = new HttpHeaders({'id_user': id_user})
    return this.httpClient.post(this.baseUrl, newExercise, {
      headers: header
    });
  }

  deleteExercise(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/" + id);
  }
}
