import {AfterViewInit, Component} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ExercisesService} from "../../../../../service/exercises.service";
import {ExerciseModel, ReturnMessage} from "../../../../../models/exercise.model";
import {createNewSheet} from "../../../../../models/sheets.model";
import {SheetsService} from "../../../../../service/sheets.service";

interface Modalidade  {
  name: string;
  abbrev: string;
}
interface Exercise  {
  name: string;
  id?: number;
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
export class ModalSheetComponent implements  AfterViewInit {
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
              private messageService: MessageService,
              private exerciseService: ExercisesService,
              private sheetService: SheetsService
              ) {
  }

  ngAfterViewInit() {
    this.initNewControlForm();
    this.onSelectExercise();
  }
  initNewControlForm() {
    this.modalidades  = [
      {name: 'Peito', abbrev: 'peito'},
      {name: 'Biceps/AnteBraço', abbrev: 'braco'},
      {name: 'Costas', abbrev: 'costas'},
      {name: 'Abdomen', abbrev: 'abdomen'},
      {name: 'Posterior', abbrev: 'posterior'},
      {name: 'Quadriceps', abbrev: 'pernas'},
      {name: 'Fortalecimento', abbrev: 'fortalecimento'},
    ];
    this.sheetFormGroup = this.formBuilder.group({
      exercises: [ 'Supino Reto', [Validators.required]],
      sheet_desc: ['',Validators.required],
      sheet_name: ['', Validators.required],
      exercise_type: ['peito',Validators.required],
      sheet_id: ['training_a',Validators.required],
      quantity: ['1'],
      sheet_details: ['']
    });
  }

  onSelectExercise() {
    const type = this.getField('exercise_type')?.value === 'Biceps/AnteBraço'? 'braco' : this.getField('exercise_type')?.value;
    this.exerciseService.listExerciseByType(type).subscribe(
      (users: ExerciseModel[]) => {
        this.listExercise = [];
        this.exercises = users;
        for (let k of this.exercises) {
          const exercicio: Exercise = {name: k.exercise, id: k.id_exercise};
          this.listExercise.push(exercicio);
        }
        this.getField('exercises')?.setValue(this.listExercise[0]);
        this.resultSheet =  this.getField('sheet_id')?.value;
      });

    return this.listExercise;
  }
  getValues(): createNewSheet {
    const sheet_name: string = this.getField('sheet_name')?.value;
    const sheet_desc: string = this.getField('sheet_desc')?.value;
    const sheet_detais: string = this.getField('sheet_details')?.value;
    let idExercisesA: number[] = [];
    let idExercisesB: number[] = [];
    let idExercisesC: number[] = [];
    let idExercisesD: number[] = [];

    for(let exercise of this.addExercisesA) {
      if (exercise.id != null) {
        idExercisesA.push(exercise.id);
      }
    }
    for(let exercise of this.addExercisesB) {
      if (exercise.id != null) {
        idExercisesB.push(exercise.id);
      }
    }
    for(let exercise of this.addExercisesC) {
      if (exercise.id != null) {
        idExercisesC.push(exercise.id);
      }
    }
    for(let exercise of this.addExercisesD) {
      if (exercise.id != null) {
        idExercisesD.push(exercise.id);
      }
    }

    return {
      sheet_name: sheet_name,
      sheet_desc: sheet_desc,
      sheet_details: sheet_detais,
      training_a: idExercisesA.toString(),
      training_b: idExercisesB.toString(),
      training_c: idExercisesC.toString(),
      training_d: idExercisesD.toString(),
    }
  }
  submitNewSheet() {
    const newSheet: createNewSheet = this.getValues();
    this.sheetService.addNewSheet(newSheet).subscribe(
      (res: ReturnMessage) => {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          detail: res.message,
          life: 1500
        });
      }
    )
  }
  addMessage(severity: string, detail: string) {
    return this.messageService.add({
      severity: severity,
      key: 'tc',
      life: 1500,
      detail: detail,
    })
  }
   addExercise() {
     this.resultSheet =  this.getField('sheet_id')?.value;
      this.resultExercise = this.listExercise.find(({ name }) => name === this.getField('exercises')?.value);

     if (this.resultExercise) {
       if (this.resultSheet === 'training_a') {
         if(!(this.addExercisesA.find(({ name }) => name === this.resultExercise?.name))) {
           this.addExercisesA.push(this.resultExercise)
         } else {
           this.addMessage('error', 'Exercício Já Existe na Planilha');
         }
       } else if (this.resultSheet === 'training_b') {
         if(!(this.addExercisesB.find(({ name }) => name === this.resultExercise?.name))) {
           this.addExercisesB.push(this.resultExercise)
         } else {
           this.addMessage('error', 'Exercício Já Existe na Planilha');
         }
       } else if (this.resultSheet === 'training_c') {
         if(!(this.addExercisesC.find(({ name }) => name === this.resultExercise?.name))) {
           this.addExercisesC.push(this.resultExercise)
         } else {
           this.addMessage('error', 'Exercício Já Existe na Planilha');
         }
       } else if (this.resultSheet === 'training_d') {
         if(!(this.addExercisesD.find(({ name }) => name === this.resultExercise?.name))) {
           this.addExercisesD.push(this.resultExercise)
         } else {
           this.addMessage('error', 'Exercício Já Existe na Planilha');
         }
       }
     } else {
       this.addMessage('error', 'Erro ao adicionar Exercício')
     }
   }
  removeExercise(exercise: Exercise) {
    const resultSheet =  this.getField('sheet_id')?.value;
    if (exercise) {
      if (resultSheet === 'training_a') {
        this.addExercisesA.splice(this.addExercisesA.indexOf(exercise), 1);
        this.addMessage('success', 'Exercício Removido');


      } else if (resultSheet === 'training_b') {
        this.addExercisesB.splice(this.addExercisesB.indexOf(exercise), 1);
        this.addMessage('success', 'Exercício Removido');

      } else if (resultSheet === 'training_c') {
        this.addExercisesC.splice(this.addExercisesC.indexOf(exercise), 1);
        this.addMessage('success', 'Exercício Removido');

      } else if (resultSheet === 'training_d') {
        this.addExercisesD.splice(this.addExercisesD.indexOf(exercise), 1);
        this.addMessage('success', 'Exercício Removido');
      } else {
        this.addMessage('success', 'Erro ao Remover Exercício');

      }
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
    this.showCreateSheet = false;

  }

  getField(field: string) {
    return this.sheetFormGroup.get(field);
  }
}
