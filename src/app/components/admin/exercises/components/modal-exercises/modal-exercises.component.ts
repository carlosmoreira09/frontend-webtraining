import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {
  FormBuilder, FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {ExerciseModel, returnMessage} from "../../../../../data/exercise.model";
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
export class ModalExercisesComponent implements AfterViewInit{
  @ViewChild('openDialog')
  dialog: ElementRef

  @Input() service!: string;
  @Input() exerciseInfo: ExerciseModel;
  exerciseFormGroup: UntypedFormGroup;
  showCreateExercise = false;
  showEditExercise = false;
  categories: any;
  formValid = true;
  submitReturn: returnMessage;

  constructor(private formBuilder: FormBuilder,
              private router: ActivatedRoute,
              private exerciseService: ExercisesService,
              private messageService: MessageService,
              private exerciseComponent: ExercisesComponent) {}

  ngAfterViewInit() {
    this.categories = [
      {name: 'Abdômen', code: 'abdomen'},
      {name: 'Costas', code: 'costas'},
      {name: 'Peito', code: 'peito'},
      {name: 'Bíceps/Ante-braço', code: 'braco'},
      {name: 'Quadríceps', code: 'perna'},
      {name: 'Posterior', code: 'posterior'},
      {name: 'Fortalecimento', code: 'fortalecimento'}
    ];  }
  openDialogCreate() {
    this.initNewControlForm();
    this.showCreateExercise = !this.showCreateExercise;
  }
  openDialogEdit() {
    this.showEditExercise = !this.showEditExercise;
    this.initEditControlForm();
  }
  initEditControlForm() {
    this.exerciseFormGroup = this.formBuilder.group({
      exercise: [this.exerciseInfo?.exercise, Validators.compose([Validators.minLength(5),Validators.requiredTrue])],
      exercise_desc: [this.exerciseInfo?.exercise_desc, Validators.requiredTrue],
      repetition: [this.exerciseInfo?.repetition, Validators.requiredTrue],
      training_type: [this.exerciseInfo?.training_type, Validators.requiredTrue],
    });
  }
  initNewControlForm() {
      this.exerciseFormGroup = this.formBuilder.group({
        exercise: ['', [Validators.required, Validators.minLength(5)]],
        exercise_desc: [''],
        repetition: ['', Validators.required],
        training_type: ['', Validators.required],
      });
  }
 getField(field: string) {
    return this.exerciseFormGroup.get(field);
 }

 getFormValues(): ExerciseModel | any {
   if (this.exerciseFormGroup.valid) {
   const exercise = this.getField('exercise')?.value;
   const exercise_desc = this.getField('exercise_desc')?.value;
   const repetition = this.getField('repetition')?.value;
   const training_type = this.getField('training_type')?.value;

   return {
     exercise: exercise,
     exercise_desc: exercise_desc,
     training_type: training_type,
     repetition: repetition,
     exercise_type: this.router.snapshot.params['type']
     }
   } else {
     this.formValid = false;
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
 submitExercise() {
    const newExercise: ExerciseModel = this.getFormValues();

    this.exerciseService
      .addExercise(newExercise)
      .subscribe(
        (res: returnMessage) => {
          this.showCreateExercise = false;
          this.exerciseComponent.listExercisesByType();
          this.messageService.add({
            key: 'tc',
            severity: 'success',
            detail: res.message,
            life: 1500
          })
        }
 )}

}
