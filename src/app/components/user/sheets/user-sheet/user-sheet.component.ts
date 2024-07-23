import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ExerciseModel} from "../../../../models/exercise.model";
import {SheetsModel} from "../../../../models/sheets.model";
import {ClientsModel} from "../../../../models/clients.model";

import {SheetsService} from "../../../../service/sheets/sheets.service";
import {TrainingComponent} from "../../../admin/sheets/components/preview-sheet/table-component/training.component";


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
  public sheetA: ExerciseModel[];
  public sheetB: ExerciseModel[];
  public sheetC: ExerciseModel[];
  public sheetD: ExerciseModel[];

  constructor(private sheetService: SheetsService,) {
  }

  ngOnInit(): void {
    this.getSheetByClient();
  }

  getSheetByClient() {
    this.sheetService.getSheetByUser(25).subscribe({
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
  }

}
