import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {ClientsModel} from "../../../models/clients.model";
import {AthletesService} from "../../../service/athletes.service";
import {ModalAtletaComponent} from "./components/modal-create/modal-athlete.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {RouterLink} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ReturnMessage} from "../../../models/exercise.model";
import {CardPartnershipComponent} from "./components/card-partnership/card-partnership.component";
import {DockModule} from "primeng/dock";
import {TooltipModule} from "primeng/tooltip";
import {SheetsModel} from "../../../models/sheets.model";
import {SheetsService} from "../../../service/sheets.service";
import {PreviewSheetComponent} from "../sheets/components/preview-sheet/preview-sheet.component";
import {GalleriaModule} from "primeng/galleria";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {PaginatorModule} from "primeng/paginator";
import {CarouselModule} from "primeng/carousel";

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
    CardPartnershipComponent,
    DockModule,
    TooltipModule,
    PreviewSheetComponent,
    GalleriaModule,
    CheckboxModule,
    RadioButtonModule,
    PaginatorModule,
    NgOptimizedImage,
    CarouselModule,

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
  images: any[] | undefined;

  position: string = 'bottom';

  showIndicatorsOnItem: boolean = false;
  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom'
    },
    {
      label: 'Top',
      value: 'top'
    },
    {
      label: 'Left',
      value: 'left'
    },
    {
      label: 'Right',
      value: 'right'
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  partnerships: any = []
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
    this.partnerships = [ {
      imgSrc: "assets/img/ramonxp.png",
      alt: 'Ramon Dias XP',
      width: 700,
      height: 250,
    },
      {
        imgSrc: 'assets/img/guinutri.png',
        alt: 'Guilherme Morais Nutricionista',
        width: 700,
        height: 230,
      },
      {
        imgSrc: 'assets/img/bodyfitness.png',
        alt: 'BodyFitness Academia',
        width: 900,
        height: 250,
      }
    ];

  }

  initFormSheet() {
    this.formAddSheet = this.formBuilder.group({
      id_sheet: ['', Validators.required],
    });
    this.images = [{
      itemImageSrc: './assets/img/ramonxp.png',
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
      {
        itemImageSrc: './assets/img/guinutri.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      }];
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
