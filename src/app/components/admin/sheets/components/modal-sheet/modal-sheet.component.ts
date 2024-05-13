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
  resultExercise: Exercise | undefined;
  resultSheet: string;
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
    this.getField('exercises')?.setValue(this.listExercise[0].name)

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
  initNewControlForm() {
    this.sheetFormGroup = this.formBuilder.group({
      exercises: [ this.initExerciseType(), [Validators.required, Validators.minLength(5)]],
      sheet_desc: [''],
      sheet_name: ['', Validators.required],
      exercise_type: [this.initModalities()],
      sheet_id: ['sheet_a'],
      quantity: [1],
      sheet_details: ['']
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
    this.exerciseService.listExerciseByType(type).subscribe(
      (users: ExerciseModel[]) => {
        this.listExercise = [];
        this.exercises = users;
        for (let k of this.exercises) {
          const exercicio: Exercise = {name: k.exercise, id: k.id_exercise};
          this.listExercise.push(exercicio);
        }
        this.resultExercise = this.listExercise[0];
        this.resultSheet =  this.getField('sheet_id')?.value;
      });

    return this.listExercise;
  }
  onSubmit() {
    const sheet_name: string = this.getField('sheet_name')?.value;
    const sheet_desc: string = this.getField('sheet_desc')?.value;
    const sheet_detais: string = this.getField('sheet_detais')?.value;
    const sheet_a: Exercise[] = this.addExercisesA;
    const sheet_b: Exercise[] = this.addExercisesB;
    const sheet_c: Exercise[] = this.addExercisesC;
    const sheet_d: Exercise[] = this.addExercisesD;
  }
   addExercise() {
     this.resultSheet =  this.getField('sheet_id')?.value;
      this.resultExercise = this.listExercise.find(({ name }) => name === this.getField('exercises')?.value);
     console.log(this.resultExercise, this.resultSheet)

     if (this.resultExercise) {
       if (this.resultSheet === 'sheet_a') {
         this.addExercisesA.push(this.resultExercise)

       } else if (this.resultSheet === 'sheet_b') {
         this.addExercisesB.push(this.resultExercise)

       } else if (this.resultSheet === 'sheet_c') {
         this.addExercisesC.push(this.resultExercise)

       } else if (this.resultSheet === 'sheet_d') {
         this.addExercisesD.push(this.resultExercise)
       }
     } else {
       alert('error')
     }
   }
  removeExercise(exercise: Exercise) {
    const resultSheet =  this.getField('sheet_id')?.value;
    if (exercise) {
      if (resultSheet === 'sheet_a') {
        this.addExercisesA.splice(this.addExercisesA.indexOf(exercise), 1);

      } else if (resultSheet === 'sheet_b') {
        this.addExercisesB.splice(this.addExercisesB.indexOf(exercise), 1);

      } else if (resultSheet === 'sheet_c') {
        this.addExercisesC.splice(this.addExercisesC.indexOf(exercise), 1);

      } else if (resultSheet === 'sheet_d') {
        this.addExercisesD.splice(this.addExercisesD.indexOf(exercise), 1);
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
