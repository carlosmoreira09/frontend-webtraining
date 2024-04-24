import { Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ExerciseModel} from "../../../data/exercise.model";
import {ExercisesService} from "../../../service/exercises.service";
import {ActivatedRoute} from "@angular/router";
import {ModalExercisesComponent} from "./components/modal-exercises/modal-exercises.component";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-exercicios',
  standalone: true,
  imports: [
    NgForOf,
    ModalExercisesComponent,
    MessagesModule
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
  providers: [MessageService]
})
export class ExercisesComponent implements  OnInit {
  exercises: ExerciseModel[];
  title: string;

  constructor(private exerciseService: ExercisesService,
              private router: ActivatedRoute) {
  }
  ngOnInit() {
    this.listExercisesByType();
  }


  listExercisesByType() {
    this.router.params.subscribe((objeto: any) => {
      this.title = objeto.type;
      this.exerciseService.listExerciseByType(objeto.type).subscribe(
        (users: ExerciseModel[]) => {
          this.exercises = users;
        }
      );
    })

  }
}
