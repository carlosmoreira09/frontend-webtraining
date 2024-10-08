import {Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, isPlatformBrowser, NgIf, NgOptimizedImage} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ExerciseModel} from "../../../../models/exercise.model";
import {SheetsModel} from "../../../../models/sheets.model";
import {ClientsModel} from "../../../../models/clients.model";

import {SheetsService} from "../../../../service/sheets/sheets.service";
import {TrainingComponent} from "../../../admin/sheets/components/preview-sheet/table-component/training.component";
import {AuthService} from "../../../../service/auth/auth.service";
import {initFlowbite} from "flowbite";


@Component({
  selector: 'app-user-sheet',
  standalone: true,
  imports: [
    DialogModule,
    MessageModule,
    NgIf,
    CommonModule,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule,
    TrainingComponent,
    NgOptimizedImage,
  ],
  templateUrl: './user-sheet.component.html',
  styleUrl: './user-sheet.component.css',
  providers: [MessageService, TrainingComponent]
})
export class UserSheetComponent implements OnInit {
  @ViewChild('openDialog') dialog: ElementRef;
  sheetInfo: SheetsModel;
  showPreviewSheet: boolean = false;
  clientInfo: ClientsModel | null;
  public sheetA: ExerciseModel[] = [];
  public sheetB: ExerciseModel[] = [];
  public sheetC: ExerciseModel[] = [];
  public sheetD: ExerciseModel[] = [];
  public sheetDescription: string = '';
  constructor(private sheetService: SheetsService,
              private authService: AuthService,
              private messageService: MessageService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
    this.getSheetByClient();
  }

  getSheetByClient() {

    const id_sheet = this.authService.getSheetIdFromStorage();
      this.sheetService.getSheetByUser(parseInt(id_sheet)).subscribe({
        next: (value) => {
          this.sheetInfo = value
        },
        complete: () => {
          this.openPreviewSheet(this.sheetInfo)
        }
      })
  }
  openPreviewSheet(sheet: SheetsModel) {
      this.clientInfo = sheet.id_client;
      this.sheetA = sheet.training_a;
      this.sheetB = sheet.training_b;
      this.sheetC = sheet.training_c;
      this.sheetD = sheet.training_d;
      this.showPreviewSheet = true;
      this.sheetDescription = sheet.sheet_details;
  }

}
