import { Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ExerciseModel, ReturnMessage} from "../../../models/exercise.model";
import {ExercisesService} from "../../../service/exercises.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ModalExercisesComponent} from "./components/modal-exercises/modal-exercises.component";
import {MessagesModule} from "primeng/messages";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-exercicios',
  standalone: true,
  imports: [
    NgForOf,
    ModalExercisesComponent,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ExercisesComponent implements  OnInit {
  exercises: ExerciseModel[] = [];
  title: string;

  constructor(private exerciseService: ExercisesService,
              private router: ActivatedRoute,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
  ) {}
  ngOnInit() {
    this.listExercisesByType();
  }

  confirm(event: Event, id: number | undefined) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você deseja deletar esse exercício?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"m-2 p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.deleteExercise(id);
        this.listExercisesByType();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Exercício deletado', life: 1500 });
      },
      reject: () => {
        this.listExercisesByType();
      }
    });
  }

  deleteExercise(id: number | undefined) {
    return this.exerciseService.deleteExercise(id);
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
