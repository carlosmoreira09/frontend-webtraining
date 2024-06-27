import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {ClientsModel} from "../../../models/clients.model";
import {AthletesService} from "../../../service/athletes.service";
import {ModalAtletaComponent} from "./components/modal-create/modal-athlete.component";
import {CommonModule} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {RouterLink} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ReturnMessage} from "../../../models/exercise.model";
import {CardAthleteComponent} from "./components/card-athlete/card-athlete.component";
import {DockModule} from "primeng/dock";
import {TooltipModule} from "primeng/tooltip";
import {SheetsModel} from "../../../models/sheets.model";
import {SheetsService} from "../../../service/sheets.service";
import {PreviewSheetComponent} from "../sheets/components/preview-sheet/preview-sheet.component";

@Component({
  selector: 'app-athlete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    CommonModule,
    ModalAtletaComponent,
    RouterLink,
    ConfirmDialogModule,
    ToastModule,
    CardAthleteComponent,
    DockModule,
    TooltipModule,
    PreviewSheetComponent,

  ],
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
  providers: [MessageService, ConfirmationService]
})
export class AtletasComponent implements OnInit {
  atletas: ClientsModel[];
  titleAds1: string;
  titleAds2: string;
  titleAds3: string;
  dialogAddSheet: boolean = false;
  formAddSheet: UntypedFormGroup;
  listSheet: SheetsModel[];
  id_sheet: number | null;
  id_client: number | null;

  constructor(private athleteService: AthletesService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private sheetsService: SheetsService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.listAllUsers();
    this.initFormSheet();
    this.titleAds1 = 'Parceria 1'
    this.titleAds2 = 'Parceria 2'
    this.titleAds3 = 'Parceria 3'

  }

  initFormSheet() {
    this.formAddSheet = this.formBuilder.group({
      id_sheet: ['', Validators.required],
    });
  }

  listAllUsers() {
    return this.athleteService.listAllAthletas().subscribe(
      (users: ClientsModel[]) => {
        this.atletas = users;
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

  addSheet(id_client: number) {
    this.sheetsService.listSheets().subscribe({
      next: (sheets: SheetsModel[]) => {
        this.listSheet = sheets;
      },
      error: (err: any) => {
        this.addMessage('error', 'Erro ao Carregar Planilhas:' + err);

      },
      complete: () => {
        this.dialogAddSheet = true;
        this.id_client = id_client ? id_client : null;
      }
    })

  }

  saveSheet() {
    this.id_sheet = this.getField('id_sheet')?.value;
    if (this.id_client === null || this.id_sheet === null) {
      return this.addMessage('error', 'Erro ao carregar dados do cliente.:');
    }
    this.athleteService.saveAddSheetAthlete(this.id_sheet, this.id_client).subscribe({
      next: (value) => {
      },
      error: (err: any) => {
        this.addMessage('error', 'Erro ao Carregar Planilhas:' + err);
        this.id_client = null;
        this.id_sheet = null;
      },
      complete: () => {
        this.addMessage('success', 'Planilha adicionada ao Cliente');
        this.dialogAddSheet = false;
        this.id_client = null;
        this.id_sheet = null;
      }
    })
  }

  cancelAddSheet() {
    this.id_client = null;
    this.id_sheet = null;
    this.dialogAddSheet = false;
    this.getField('id_sheet')?.setValue('')
  }

  deleteAthlete(id_client: number | undefined) {
    this.athleteService.delete(id_client).subscribe({
      next: (res: ReturnMessage) => {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          detail: res.message,
          life: 1500
        })
      },
      error: err => {
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: err.message,
          life: 1500
        })
      },
      complete: () => {
        this.listAllUsers()
      }
    })
  }

  confirm(event: Event, id: number | undefined) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você deseja deletar esse Atleta?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "m-2 p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteAthlete(id);
        this.listAllUsers();
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Atleta deletado', life: 1500});
      },
      reject: () => {
        this.listAllUsers();
      }
    });
  }

  getField(field: string) {
    return this.formAddSheet.get(field);
  }
}
