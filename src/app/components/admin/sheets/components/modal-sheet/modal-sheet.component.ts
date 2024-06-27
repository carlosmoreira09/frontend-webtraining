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
import {createNewSheet, Modalidade, SheetsModel} from "../../../../../models/sheets.model";
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
  @ViewChild('editDialog') editDialog: ElementRef

  quantitySheet: number;
  id_client: number | null = null;
  showCreateSheet: boolean = false;
  showEditSheet: boolean = false;
  formValid: boolean = false;
  dialogAthlete: boolean = false;
  resultSheet: string;
  sheets: any[] = [];
  sheetFormGroup: UntypedFormGroup;
  formAthleta: UntypedFormGroup;
  exercises: ExerciseModel[]
  listExercise: ExerciseModel[] = [];
  resultExercise: ExerciseModel | undefined;
  listAthlete: ClientsModel[];
  athlete: ClientsModel | undefined;
  athletes: ClientsModel[] = [];
  editSheet: SheetsModel;
  returnMessage: ReturnMessage;
  addExercisesA: ExerciseModel[];
  addExercisesB: ExerciseModel[];
  addExercisesC: ExerciseModel[];
  addExercisesD: ExerciseModel[];
  modalidades: Modalidade[] = [];


  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private exerciseService: ExercisesService,
              private sheetService: SheetsService,
              private sheetsComponent: SheetsComponent,
              private athleteService: AthletesService,
  ) {
  }

  ngOnInit(): void {
    this.modalidades = this.athleteService.getOptions();
    this.initNewControlForm()
  }

  initNewControlForm() {
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
    this.addExercisesA = [];
    this.addExercisesB = [];
    this.addExercisesC = [];
    this.addExercisesD = [];
  }
  initEditControlForm() {
  if (this.editSheet.training_d.length === 0 && this.editSheet.training_c.length !== 0) {
      this.quantitySheet = 3
    } else if (this.editSheet.training_c.length === 0) {
    this.quantitySheet = 2
  } else if (this.editSheet.training_b.length === 0 && this.editSheet.training_c.length === 0) {
    this.quantitySheet = 1
  } else {
    this.quantitySheet = 4
  }
    this.sheetFormGroup = this.formBuilder.group({
      exercises: [this.setExercise('peito'), [Validators.required]],
      sheet_desc: [this.editSheet.sheet_desc, Validators.required],
      sheet_name: [this.editSheet.sheet_name, Validators.required],
      exercise_type: [this.modalidades[0].abbrev, Validators.required],
      sheet_id: ['training_a', Validators.required],
      quantity: [this.quantitySheet.toString(), Validators.required],
      sheet_details: [this.editSheet.sheet_details],

    });
    this.addExercisesA = this.editSheet.training_a;
    this.addExercisesB = this.editSheet.training_b;
    this.addExercisesC = this.editSheet.training_c;
    this.addExercisesD = this.editSheet.training_d;
    this.formAthleta = this.formBuilder.group({
      id_client: ['', Validators.required],
    });
  }
  closeEditModal() {
    this.dialogAthlete = true;
    this.initEditControlForm();
  }
  clearForm() {
    this.addExercisesA = [];
    this.addExercisesB = [];
    this.addExercisesC = [];
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
  cancelAddAthlete(){
    this.id_client = null;
    this.dialogAthlete = false;
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

  getValues(): createNewSheet {
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
  changeNumberOfTraining() {
    const quantity = this.getField('quantity')?.value;
    if (quantity == 1) {
      this.addExercisesB = [];
      this.addExercisesC = [];
      this.addExercisesD = [];
    }
    if (quantity == 2) {
      this.addExercisesC = [];
      this.addExercisesD = [];
    }
    if(quantity == 3) {
      this.addExercisesD = [];
    }
  }
  submitEditSheet() {

    let updateSheet: createNewSheet = this.getValues();
    updateSheet = { ...updateSheet, id_sheet: this.editSheet.id_sheet}
    this.sheetService.updateSheet(updateSheet).subscribe({
      next: (res: ReturnMessage) => {
        this.returnMessage = res;
      },
      error: (res: ReturnMessage) => {
        this.addMessage('error', res.message);
      },
      complete: () => {
        this.showEditSheet = false;
        this.addMessage('success', this.returnMessage.message)
        if(this.id_client && this.editSheet.id_sheet) {
          let res: ReturnMessage;
          this.athleteService.saveAddSheetAthlete(this.editSheet.id_sheet, this.id_client).subscribe({
            next: (value: ReturnMessage) => {
              res = value;
            },
            error: (err: any) => {
              this.addMessage('error', 'Erro ao Salvar Cliente na Planilha:' + err);
            },
            complete: () => {
              this.addMessage('success', res.message);
            }
          })
        }
        this.clearForm();
        this.sheetsComponent.listSheets();
      }
    })
  }

  submitNewSheet() {
    let returnMessage: ReturnMessage;
    const newSheet: createNewSheet = this.getValues();
    this.sheetService.addNewSheet(newSheet).subscribe({
    next: (res: ReturnMessage) => {
      returnMessage = res;
    },
      error: (res: ReturnMessage) => {
      this.addMessage('error', res.message);
      },
      complete: () => {
        this.showCreateSheet = false;
        this.addMessage('success', returnMessage.message)
        if(this.id_client !== null) {
          this.athleteService.saveAddSheetAthlete(parseInt(returnMessage.id), this.id_client).subscribe({
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
    this.initEditControlForm();
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
