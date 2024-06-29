import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ExerciseModel, ReturnMessage} from "../../../models/exercise.model";
import {ExercisesService} from "../../../service/exercises/exercises.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ModalExercisesComponent} from "./components/modal-exercises/modal-exercises.component";
import {MessagesModule} from "primeng/messages";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AuthService} from "../../../service/auth/auth.service";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";

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
        RouterLink,
        DialogModule,
        ReactiveFormsModule
    ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ExercisesComponent implements OnInit {
  exercises: ExerciseModel[] = [];
  title: string;
  dialogAddVideo: boolean = false;
  formAddvideo: UntypedFormGroup;
  currentFile?: File;
  exercise: ExerciseModel;
  constructor(private exerciseService: ExercisesService,
              private router: ActivatedRoute,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.listExercisesByType();
    this.formAddvideo = this.formBuilder.group({
      videoName: ['',Validators.required],
      inputVideo: ['',Validators.required],
    });
  }


  confirm(event: Event, id: number | undefined) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você deseja deletar esse exercício?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "m-2 p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteExercise(id);
        this.listExercisesByType();
        this.addMessage('info', 'Exercicio Deletado')
      },
      reject: () => {
        this.listExercisesByType();
      }
    });
  }
  addMessage(severity: string, detail: string) {
    return this.messageService.add({
      severity: severity,
      key: 'tc',
      life: 1500,
      detail: detail,
    })
  }
  deleteExercise(id: number | undefined) {
    return this.exerciseService.deleteExercise(id);
  }
  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
  }
  saveAddVideo() {
    let returnMessage: ReturnMessage;
    if (this.currentFile && this.exercise.id_exercise) {
      const videoName = this.getField('videoName')?.value;
      this.exerciseService.uploadVideo(this.currentFile, this.exercise.id_exercise, videoName).subscribe( {
        next: value => {
          returnMessage = value;
        },
        error: () => {
            this.addMessage('error', 'Não foi Possível Salvar o video')
        },
        complete: () => {
          this.dialogAddVideo = false;
          this.addMessage('success', returnMessage.message)
        },
      })
    }
  }
  openDialogAddVideo(exercise: ExerciseModel) {
    this.exercise = exercise;
    this.dialogAddVideo = true;
  }

  cancelAddVideo() {
   this.currentFile = undefined;
   this.dialogAddVideo = false;
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
  getField(field: string) {
    return this.formAddvideo.get(field);
  }
}
