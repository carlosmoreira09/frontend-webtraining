import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ExerciseModel, ReturnMessage} from "../../../models/exercise.model";
import {ExercisesService} from "../../../service/exercises/exercises.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ModalExercisesComponent} from "./components/modal-exercises/modal-exercises.component";
import {MessagesModule} from "primeng/messages";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {ProgressBarModule} from "primeng/progressbar";
import {environment} from "../../../../environments/environment";

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
    ReactiveFormsModule,
    NgIf,
    ProgressBarModule
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
  videoname?: string = undefined;
  uploadingFile: boolean = false;
  videoSrc?: string;
  constructor(private exerciseService: ExercisesService,
              private router: ActivatedRoute,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.listExercisesByType();
    this.initForm();
  }

  initForm() {
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
    return this.exerciseService.deleteExercise(id).subscribe(
      {
        complete: () => {
          this.listExercisesByType();
        }
      }
    );
  }
  selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
     if(input.files) {
       this.currentFile = input.files[0];
     } else {
       this.addMessage('error','Erro ao Carregar Arquivo');
     }
  }
  saveAddVideo() {
    if(this.formAddvideo.invalid) {
      return this.addMessage('error','Verifique Formulario');
    }
    this.uploadingFile = true;
    let returnMessage: ReturnMessage;
    if (this.currentFile && this.exercise.id_exercise) {
      const videoName = this.getField('videoName')?.value;
      this.exerciseService.uploadVideo(this.currentFile, this.exercise.id_exercise, videoName).subscribe( {
        next: value => {
          returnMessage = value;
        },
        error: (err) => {
            this.addMessage('error', 'Erro: '+err.error.message);
            this.currentFile = undefined;
        },
        complete: () => {
          this.uploadingFile = false;
          this.dialogAddVideo = false;
          this.currentFile = undefined;
          this.videoSrc = undefined;
          this.initForm();
          this.listExercisesByType();
          this.addMessage('success', returnMessage.message)
        },
      })
    }
  }
  fixTitle() {
    switch (this.title) {
      case 'braco':
        return 'Bíceps'
      case 'triceps':
        return 'Tríceps'
      case 'trapezio':
        return 'Trapézio'
      case 'abdomen':
        return 'Abdômen'
      case 'quadriceps':
        return 'Quadríceps'
      case 'gluteo':
        return 'Glúteo'
      default:
        return this.title
    }
  }
  openDialogAddVideo(exercise: ExerciseModel) {
    this.exercise = exercise;
    this.dialogAddVideo = true;
    if(exercise?.videoName) {
      this.videoname = exercise.videoName.split('__')[2].replace('-', ' ');
      this.videoSrc = environment.baseUrl + "media/"+exercise.videoName;
    }
  }

  cancelAddVideo() {
   this.currentFile = undefined;
   this.dialogAddVideo = false;
   this.videoSrc = undefined;
   this.videoname = undefined;
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
