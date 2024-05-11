import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgFor, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ActivatedRoute} from "@angular/router";
import {ExercisesService} from "../../../../../service/exercises.service";
import {ExercisesComponent} from "../../../exercises/exercises.component";
import {ExerciseModel} from "../../../../../data/exercise.model";

@Component({
  selector: 'app-modal-sheet',
  standalone: true,
  imports: [
    DialogModule,
    MessageModule,
    NgIf,
    CommonModule,
    PaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    ToastModule,
  ],
  templateUrl: './modal-sheet.component.html',
  styleUrl: './modal-sheet.component.css',
  providers: [MessageService]
})
export class ModalSheetComponent {
  showCreateSheet: boolean = false;
  showEditSheet: boolean = false;
  formValid: boolean = false;
  sheetFormGroup: UntypedFormGroup;
  exercises: ExerciseModel[]
  list: any[] = [];
  public addExercises: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: ActivatedRoute,
              private messageService: MessageService,
              private exerciseService: ExercisesService
              ) {
  }

  public modalidades = [
    {name: 'Peito', abbrev: 'peito'},
    {name: 'Biceps/AnteBraço', abbrev: 'braco'},
    {name: 'Costas', abbrev: 'costas'},
    {name: 'Abdomen', abbrev: 'abdomen'},
    {name: 'Posterior', abbrev: 'posterior'},
    {name: 'Quadriceps', abbrev: 'pernas'},
    {name: 'Fortalecimento', abbrev: 'fortalecimento'},
  ];

  initNewControlForm() {
    this.sheetFormGroup = this.formBuilder.group({
      exercises: ['', [Validators.required, Validators.minLength(5)]],
      sheet_desc: [''],
      sheet_name: ['', Validators.required],
      exercise_type: [''],

    });
  }
   onSelectExercise() {
    console.log("teste")
    this.exerciseService.listExerciseByType(this.getField('exercise_type')?.value).subscribe(
      (users: ExerciseModel[]) => {
        this.list = [];
        this.exercises = users;
        for (let k of this.exercises) {
          const exercicio = {name: k.exercise, abbrev: k.id_exercise};
          this.list.push(exercicio);
        }
      }
    );
  }
   addExercise() {
    const text = this.getField('exercises')?.value;
      const addOne = {name: text, abbrev: 'teste'};

      this.addExercises.push(addOne);

    }

  openDialogCreate() {
    this.initNewControlForm();
    this.showCreateSheet = !this.showCreateSheet;
  }
  openDialogEdit() {
    this.initNewControlForm();
    this.showEditSheet = !this.showEditSheet;
  }
  onCloseCreate() {

  }

  onCloseEdit() {

  }

  submitNewSheet() {

  }

  getField(field: string) {
    return this.sheetFormGroup.get(field);
  }
}
