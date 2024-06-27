import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {ExerciseModel, ReturnMessage} from "../../../../../models/exercise.model";
import {DropdownModule} from "primeng/dropdown";
import {ActivatedRoute} from "@angular/router";
import {ExercisesService} from "../../../../../service/exercises.service";
import {ExercisesComponent} from "../../exercises.component";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";

@Component({
  selector: 'app-modal-exercises',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    MessagesModule,
    ToastModule,
    NgIf,
    MessageModule,
  ],
  templateUrl: './modal-exercises.component.html',
  styleUrl: './modal-exercises.component.css',
  providers: [MessageService]
})
export class ModalExercisesComponent implements AfterViewInit {
  @ViewChild('openDialog')
  dialog: ElementRef

  @Input() service!: string;
  @Input() exerciseInfo: ExerciseModel;
  exerciseFormGroup: UntypedFormGroup;
  showCreateExercise = false;
  showEditExercise = false;
  formValid = true;

  constructor(private formBuilder: FormBuilder,
              private router: ActivatedRoute,
              private exerciseService: ExercisesService,
              private messageService: MessageService,
              private exerciseComponent: ExercisesComponent) {
  }

  ngAfterViewInit() {

  }

  openDialogCreate() {
    this.initNewControlForm();
    this.showCreateExercise = !this.showCreateExercise;
  }

  openDialogEdit() {
    this.initEditControlForm();
    this.showEditExercise = !this.showEditExercise;
  }

  initEditControlForm() {
    this.exerciseFormGroup = this.formBuilder.group({
      exercise: [this.exerciseInfo?.exercise, Validators.compose([Validators.minLength(5), Validators.requiredTrue])],
      exercise_desc: [this.exerciseInfo?.exercise_desc, Validators.requiredTrue],
      repetition: [this.exerciseInfo?.repetition, Validators.requiredTrue],
      id_exercise: [this.exerciseInfo?.id_exercise, Validators.requiredTrue],
    });
  }

  initNewControlForm() {
    this.exerciseFormGroup = this.formBuilder.group({
      exercise: ['', [Validators.required, Validators.minLength(5)]],
      exercise_desc: ['', Validators.required],
      repetition: ['', Validators.required],
    });
  }

  getField(field: string) {
    return this.exerciseFormGroup.get(field);
  }

  getFormValues(): ExerciseModel {

    const exercise = this.getField('exercise')?.value;
    const exercise_desc = this.getField('exercise_desc')?.value;
    const repetition = this.getField('repetition')?.value;

    return {
      exercise: exercise,
      exercise_desc: exercise_desc,
      repetition: repetition,
      exercise_type: this.router.snapshot.params['type']

    }
  }

  onCloseCreate() {
    this.showCreateExercise = false;
    this.exerciseFormGroup.reset();
    this.initNewControlForm();
  }

  onCloseEdit() {
    this.openDialogEdit();
  }

  addMessage(severity: string, detail: string) {
    return this.messageService.add({
      severity: severity,
      key: 'tc',
      life: 1500,
      detail: detail,
    })
  }

  submitEditExercise() {
    let returnMessage: ReturnMessage
    let updateExercise: ExerciseModel = this.getFormValues();
    const id_exercise = this.getField('id_exercise')?.value
    updateExercise = {...updateExercise, id_exercise: id_exercise};
    this.exerciseService.updateExercise(updateExercise).subscribe({
      next: (res: ReturnMessage) => {
        returnMessage = res;
      },
      error: (err: ReturnMessage) => {
        this.addMessage('error', err.message)
      },
      complete: () => {
        this.showEditExercise = false;
        this.addMessage('success', returnMessage.message)
        this.exerciseComponent.listExercisesByType();
      }
    })
  }

  submitExercise() {
    let returnMessage: ReturnMessage;
    const newExercise: ExerciseModel = this.getFormValues();

    this.exerciseService
      .addExercise(newExercise)
      .subscribe({
        next: (res: ReturnMessage) => {
          returnMessage = res;
        },
        error: (err: ReturnMessage) => {
          this.addMessage('error', err.message)

        },
        complete: () => {
          this.showCreateExercise = false;
          this.addMessage('success', returnMessage.message)
          this.exerciseComponent.listExercisesByType();
        }
      })
  }

}
