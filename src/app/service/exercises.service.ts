import {Injectable, Self} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExerciseModel} from "../data/exercise.model";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private url: string = "http://localhost:3000/api/exercises";

  constructor(@Self() private httpClient: HttpClient) { }

  listExerciseByType(type: string) {
    return this.httpClient.get<ExerciseModel[]>(this.url + "/" + type);
  }
  addExercise(newExercise: ExerciseModel): Observable<any> {
    return this.httpClient.post(this.url,newExercise, {responseType: 'text'})
  }
}
