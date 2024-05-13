import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgFor, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ActivatedRoute} from "@angular/router";
import {ExercisesService} from "../../../../../service/exercises.service";
import {ExerciseModel} from "../../../../../data/exercise.model";

interface Modalidade  {
  name: string;
  abbrev: string;
}
interface Exercise  {
  name: string;
  id?: number;
}
interface Sheet  {
  name: string;
  id: string;
}
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
export class ModalSheetComponent implements  OnInit {
  showCreateSheet: boolean = false;
  showEditSheet: boolean = false;
  formValid: boolean = false;
  sheetFormGroup: UntypedFormGroup;
  exercises: ExerciseModel[]
  listExercise: Exercise[] = [];
  sheets: any[]  = [];
  public addExercisesA: Exercise[] = [];
  public addExercisesB: Exercise[] = [];
  public addExercisesC: Exercise[] = [];
  public addExercisesD: Exercise[] = [];
  public modalidades: Modalidade[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: ActivatedRoute,
              private messageService: MessageService,
              private exerciseService: ExercisesService
              ) {
  }

  ngOnInit() {
    this.initNewControlForm();
    this.getField('sheet_id')?.setValue(this.sheets[0].name)
    this.getField('exercises')?.setValue(this.listExercise[0].name)
    console.log(this.getField('exercises')?.value)
    console.log(this.getField('sheet_id')?.value)

  }
  initModalities() {
    this.modalidades  = [
      {name: 'Peito', abbrev: 'peito'},
      {name: 'Biceps/AnteBraço', abbrev: 'braco'},
      {name: 'Costas', abbrev: 'costas'},
      {name: 'Abdomen', abbrev: 'abdomen'},
      {name: 'Posterior', abbrev: 'posterior'},
      {name: 'Quadriceps', abbrev: 'pernas'},
      {name: 'Fortalecimento', abbrev: 'fortalecimento'},
    ];
    return this.modalidades[0].abbrev;
  }
  initSheet() {
         this.sheets  = [
      {name: 'Treino A', id: 'sheet_a'},
      {name: 'Treino B', id: 'sheet_b'},
      {name: 'Treino C', id: 'sheet_c'},
      {name: 'Treino D', id: 'sheet_d'},
    ];
    return this.sheets[0].name
  }
  initNewControlForm() {
    this.sheetFormGroup = this.formBuilder.group({
      exercises: [ this.initExerciseType(), [Validators.required, Validators.minLength(5)]],
      sheet_desc: [''],
      sheet_name: ['', Validators.required],
      exercise_type: [this.initModalities()],
      sheet_id: [this.initSheet()],
    });
  }
   initExerciseType() {
     this.exerciseService.listExerciseByType('peito').subscribe(
      (users: ExerciseModel[]) => {
        this.listExercise = [];
        this.exercises = users;
        for (let k of this.exercises) {
          const exercicio: Exercise = {name: k.exercise, id: k.id_exercise};
          this.listExercise.push(exercicio);
        }
      });
     return this.listExercise[0].name;
  }
  onSelectExercise() {
    const type = this.getField('exercise_type')?.value;
    console.log(type)
    this.exerciseService.listExerciseByType(type).subscribe(
      (users: ExerciseModel[]) => {
        this.listExercise = [];
        this.exercises = users;
        for (let k of this.exercises) {
          const exercicio: Exercise = {name: k.exercise, id: k.id_exercise};
          this.listExercise.push(exercicio);
        }
      });
    return this.listExercise;
  }
   addExercise() {
     const resultSheet: Sheet | undefined = this.sheets.find(({ name }) => name === this.getField('sheet_id')?.value);
     const resultExercise: Exercise | undefined = this.listExercise.find(({ name }) => name === this.getField('exercises')?.value);
     if (resultExercise && resultSheet) {
       if (resultSheet.id === 'sheet_a') {
         this.addExercisesA.push(resultExercise)

       } else if (resultSheet.id === 'sheet_b') {
         this.addExercisesB.push(resultExercise)

       } else if (resultSheet.id === 'sheet_c') {
         this.addExercisesC.push(resultExercise)

       } else if (resultSheet.id === 'sheet_d') {
         this.addExercisesD.push(resultExercise)
       }
     } else {
       alert('error')
     }
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
    this.showCreateSheet = false;
  }

  onCloseEdit() {

  }

  submitNewSheet() {

  }

  getField(field: string) {
    return this.sheetFormGroup.get(field);
  }
}
