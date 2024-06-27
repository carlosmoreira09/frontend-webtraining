import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExerciseModel, ReturnMessage} from "../models/exercise.model";
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

  listExerciseByType(type: string): Observable<ExerciseModel[]> {
    const id_user = this.authService.getUserId();
    const header = new HttpHeaders({'id_user': id_user})
    return this.httpClient.get<ExerciseModel[]>(this.baseUrl + "exercises/" + type, {
      headers: header
    });
  }

  getCategories() {
    return [
      {name: 'Abdômen', code: 'abdomen'},
      {name: 'Costas', code: 'costas'},
      {name: 'Peito', code: 'peito'},
      {name: 'Bíceps/Ante-braço', code: 'braco'},
      {name: 'Quadríceps', code: 'perna'},
      {name: 'Posterior', code: 'posterior'},
      {name: 'Fortalecimento', code: 'fortalecimento'}
    ];
  }

  updateExercise(updateExercise: ExerciseModel): Observable<ReturnMessage> {
    return this.httpClient.put<ReturnMessage>(this.baseUrl + "exercises", updateExercise)
  }

  addExercise(newExercise: ExerciseModel): Observable<ReturnMessage> {
    const id_user = this.authService.getUserId();
    const header = new HttpHeaders({'id_user': id_user})
    return this.httpClient.post<ReturnMessage>(this.baseUrl + "exercises", newExercise, {
      headers: header
    });
  }

  deleteExercise(id: number | undefined): Observable<ReturnMessage> {
    return this.httpClient.delete<ReturnMessage>(this.baseUrl + "exercises/" + id);
  }

}
