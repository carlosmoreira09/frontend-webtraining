import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ExerciseModel} from "../../../../../models/exercise.model";
import {ClientsModel} from "../../../../../models/clients.model";
import {SheetsModel} from "../../../../../models/sheets.model";
import {TrainingComponent} from "./table-component/training.component";
import {HeaderTableComponent} from "./header-component/header-table.component";
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-preview-sheet',
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
    TrainingComponent,
    TrainingComponent,
    TrainingComponent,
    HeaderTableComponent,
  ],
  templateUrl: './preview-sheet.component.html',
  styleUrl: './preview-sheet.component.css',
  providers: [MessageService, TrainingComponent]
})
export class PreviewSheetComponent implements OnInit {
  @ViewChild('openDialog') dialog: ElementRef;
  @ViewChild('tablepreview') table: ElementRef;
  @Input() sheetInfo: SheetsModel;
  showPreviewSheet: boolean = false;
  exercises: ExerciseModel[]
  clientInfo: ClientsModel;
  public sheetA: ExerciseModel[];
  public sheetB: ExerciseModel[];
  public sheetC: ExerciseModel[];
  public sheetD: ExerciseModel[];

  constructor() {
  }

  ngOnInit(): void {

  }

  openDialogCreate(sheet: SheetsModel) {
    this.sheetInfo = sheet;
    this.clientInfo = this.sheetInfo.id_client;
    this.sheetA = this.sheetInfo.training_a;
    this.sheetB = this.sheetInfo.training_b;
    this.sheetC = this.sheetInfo.training_c;
    this.sheetD = this.sheetInfo.training_d;
    this.showPreviewSheet = true;

  }

  onCloseCreate() {
    this.showPreviewSheet = false;
  }
  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );

    /* new format */
    let fmt = "0.00";
    /* change cell format of range B2:D4 */
    const range = { s: { r: 1, c: 1 }, e: { r: 2, c: 100000 } };
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (!cell || cell.t != "n") continue; // only format numeric cells
        cell.z = fmt;
      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
     fmt = "@";
    wb.Sheets["Sheet1"]["F"] = fmt;

    /* save to file */
    XLSX.writeFile(wb, "SheetJS.xlsx");
  }
}
