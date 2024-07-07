import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExerciseModel, ReturnMessage} from "../../models/exercise.model";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private baseUrl: string = environment.baseUrl;

  constructor(@Self() private httpClient: HttpClient,
              private authService: AuthService) {
  }

  getOptions() {
    return [
      {name: 'Peito', abbrev: 'peito'},
      {name: 'Biceps', abbrev: 'braco'},
      {name: 'Tríceps', abbrev: 'triceps'},
      {name: 'Trapézio', abbrev: 'trapezio'},
      {name: 'Glúteo', abbrev: 'gluteo'},
      {name: 'Costas', abbrev: 'costas'},
      {name: 'Abdomen', abbrev: 'abdomen'},
      {name: 'Posterior', abbrev: 'posterior'},
      {name: 'Quadriceps', abbrev: 'pernas'},
      {name: 'Ombro', abbrev: 'ombro'},
      {name: 'Fortalecimento', abbrev: 'fortalecimento'}
    ];
  }

  listExerciseByType(type: string): Observable<ExerciseModel[]> {
    const id_user = this.authService.getUserId();
    const header = new HttpHeaders({'id_user': id_user})
    return this.httpClient.get<ExerciseModel[]>(this.baseUrl + "exercises/" + type, {
      headers: header
    });
  }

  uploadVideo(file: File, id_exercise: number, videoName: string): Observable<any> {
    const id_user = this.authService.getUserId();
    const fileName = id_exercise + "__" + videoName +"__" + id_user;
    const fileExtension:string | undefined = file.name.split('?')[0].split('.').pop();

    const formData: FormData = new FormData();
    formData.append('file', file, fileName+"."+fileExtension);
    let headers = new HttpHeaders();
    headers = headers.append('enctype', 'multipart/form-data');
    return this.httpClient.post<any>(this.baseUrl + "exercises/uploadVideo", formData, { headers: headers });
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
