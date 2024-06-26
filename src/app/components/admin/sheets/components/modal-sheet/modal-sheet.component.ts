import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ExercisesService} from "../../../../../service/exercises.service";
import {ExerciseModel, ReturnMessage} from "../../../../../models/exercise.model";
import {createNewSheet, Modalidade} from "../../../../../models/sheets.model";
import {SheetsService} from "../../../../../service/sheets.service";
import {SheetsComponent} from "../../sheets.component";
import {AthletesService} from "../../../../../service/athletes.service";
import { ClientsModel} from "../../../../../models/clients.model";

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
    ToastModule,
  ],
  templateUrl: './modal-sheet.component.html',
  styleUrl: './modal-sheet.component.css',
  providers: [MessageService]
})
export class ModalSheetComponent implements OnInit {
  @ViewChild('openDialog') dialog: ElementRef

  id_client: number | null = null;
  showCreateSheet: boolean = false;
  showEditSheet: boolean = false;
  formValid: boolean = false;
  sheetFormGroup: UntypedFormGroup;
  formAthleta: UntypedFormGroup;
  exercises: ExerciseModel[]
  listExercise: ExerciseModel[] = [];
  sheets: any[] = [];
  resultExercise: ExerciseModel | undefined;
  resultSheet: string;
  listAthlete: ClientsModel[];
  athlete: ClientsModel | undefined;
  athletes: ClientsModel[] = [];
  dialogAthlete: boolean = false;

  public addExercisesA: ExerciseModel[] = [];
  public addExercisesB: ExerciseModel[] = [];
  public addExercisesC: ExerciseModel[] = [];
  public addExercisesD: ExerciseModel[] = [];
  public modalidades: Modalidade[] = [];


  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private exerciseService: ExercisesService,
              private sheetService: SheetsService,
              private sheetsComponent: SheetsComponent,
              private athleteService: AthletesService,
  ) {
  }

  ngOnInit(): void {
    this.initNewControlForm()
  }

  initNewControlForm() {
    this.modalidades = [
      {name: 'Peito', abbrev: 'peito'},
      {name: 'Biceps/AnteBraço', abbrev: 'braco'},
      {name: 'Costas', abbrev: 'costas'},
      {name: 'Abdomen', abbrev: 'abdomen'},
      {name: 'Posterior', abbrev: 'posterior'},
      {name: 'Quadriceps', abbrev: 'pernas'},
      {name: 'Fortalecimento', abbrev: 'fortalecimento'},
    ];
    this.sheetFormGroup = this.formBuilder.group({
      exercises: [this.setExercise('peito'), [Validators.required]],
      sheet_desc: ['', Validators.required],
      sheet_name: ['', Validators.required],
      exercise_type: [this.modalidades[0].abbrev, Validators.required],
      sheet_id: ['training_a', Validators.required],
      quantity: ['1', Validators.required],
      sheet_details: [''],

    });
    this.formAthleta = this.formBuilder.group({
      id_client: ['', Validators.required],
    });
  }

  clearForm() {
    this.addExercisesA = [];
    this.addExercisesB = [];
    this.addExercisesC= [];
    this.addExercisesD = [];
    this.initNewControlForm();
  }

  saveAthlete() {
    this.id_client = this.formAthleta.get('id_client')?.value;
    this.athletes.find((value) => {
      if (value.id_client === parseInt(this.formAthleta.get('id_client')?.value)) {
        this.athlete = value;
        this.dialogAthlete = false;
      }
    }
    );
  }

  setExercise(type: string) {
    this.exerciseService.listExerciseByType(type).subscribe({
      next: (users: ExerciseModel[]) => {
        this.exercises = users;
      },
      complete: () => {
        this.listExercise = [];
        for (let exercise of this.exercises) {
          this.listExercise.push(exercise);
        }
        if(this.exercises.length == 0) {
          this.addMessage('warn', 'Adicione Exercícios na Aba de Exercícios');
        }
        this.getField('exercises')?.setValue(this.listExercise[0].id_exercise);
      }
    });
    return this.listExercise;
  }

  addAthlete() {
    this.athleteService.listAllAthletas().subscribe({
      next: (athletes: ClientsModel[]) => {
        this.athletes = athletes;
      },
      error: (err: any) => {
        this.addMessage('error', 'Erro ao Carregar Atletas:' + err);

      },
      complete: () => {
        this.listAthlete = [];
        for (let athlete of this.athletes) {
          this.listAthlete.push(athlete);
        }
        this.dialogAthlete = true;
      }
    })
  }

  onSelectExercise() {
    const type = this.getField('exercise_type')?.value;
    this.setExercise(type);
  }

  getValues() {
    const sheet_name: string = this.getField('sheet_name')?.value;
    const sheet_desc: string = this.getField('sheet_desc')?.value;
    const sheet_detais: string = this.getField('sheet_details')?.value;
    let idExercisesA: number[] = [];
    let idExercisesB: number[] = [];
    let idExercisesC: number[] = [];
    let idExercisesD: number[] = [];

    for (let exercise of this.addExercisesA) {
      if (exercise.id_exercise != null) {
        idExercisesA.push(exercise.id_exercise);
      }
    }
    for (let exercise of this.addExercisesB) {
      if (exercise.id_exercise != null) {
        idExercisesB.push(exercise.id_exercise);
      }
    }
    for (let exercise of this.addExercisesC) {
      if (exercise.id_exercise != null) {
        idExercisesC.push(exercise.id_exercise);
      }
    }
    for (let exercise of this.addExercisesD) {
      if (exercise.id_exercise != null) {
        idExercisesD.push(exercise.id_exercise);
      }
    }

    if(this.id_client != null) {
      return {
        sheet_name: sheet_name,
        sheet_desc: sheet_desc,
        sheet_details: sheet_detais,
        training_a: idExercisesA.toString(),
        training_b: idExercisesB.toString(),
        training_c: idExercisesC.toString(),
        training_d: idExercisesD.toString(),
        id_client: this.id_client,
      }
    } else {
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
  }

  submitNewSheet() {
    let returnMessage: ReturnMessage;
    const newSheet: createNewSheet = this.getValues();
    this.sheetService.addNewSheet(newSheet).subscribe({
    next: (res: ReturnMessage) => {
      returnMessage = res;
      this.showCreateSheet = false;
      this.addMessage('success', res.message)
    },
      error: (res: ReturnMessage) => {
      this.addMessage('error', res.message);
      },
      complete: () => {
        if(this.athlete?.id_client) {
          this.athleteService.saveAddSheetAthlete(parseInt(returnMessage.id), this.athlete.id_client).subscribe({
            next: (value) => {
            },
            error: (err: any) => {
              this.addMessage('error', 'Erro ao Salvar Cliente na Planilha:' + err);
            },
            complete: () => {
              this.addMessage('success', 'Planilha adicionada ao Cliente');
            }
          })
        }

        this.clearForm();
        this.sheetsComponent.listSheets();
      }
  })
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
    this.resultSheet = this.getField('sheet_id')?.value;
    const addNewExercise = this.getField('exercises')?.value

    this.resultExercise = this.listExercise.find((value) => value.id_exercise === parseInt(addNewExercise));
    if (this.resultExercise) {
      if (this.resultSheet === 'training_a') {
        if (!(this.addExercisesA.find((value) => value.id_exercise === parseInt(addNewExercise)))) {
          this.addExercisesA.push(this.resultExercise)
        } else {
          this.addMessage('error', 'Exercício Já Existe na Planilha');
        }
      } else if (this.resultSheet === 'training_b') {
        if (!(this.addExercisesB.find((value) => value.id_exercise === parseInt(addNewExercise)))) {
          this.addExercisesB.push(this.resultExercise)
        } else {
          this.addMessage('error', 'Exercício Já Existe na Planilha');
        }
      } else if (this.resultSheet === 'training_c') {
        if (!(this.addExercisesC.find((value) => value.id_exercise === parseInt(addNewExercise)))) {
          this.addExercisesC.push(this.resultExercise)
        } else {
          this.addMessage('error', 'Exercício Já Existe na Planilha');
        }
      } else if (this.resultSheet === 'training_d') {
        if (!(this.addExercisesD.find((value) => value.id_exercise === parseInt(addNewExercise)))) {
          this.addExercisesD.push(this.resultExercise)
        } else {
          this.addMessage('error', 'Exercício Já Existe na Planilha');
        }
      }
    } else {
      this.addMessage('error', 'Erro ao adicionar Exercício')
    }
  }

  removeExercise(exercise: ExerciseModel) {
    const resultSheet = this.getField('sheet_id')?.value;
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
