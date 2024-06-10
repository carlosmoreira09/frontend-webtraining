import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ExerciseModel} from "../../../../../models/exercise.model";

import {AthletesService} from "../../../../../service/athletes.service";
import {AthleteInfo, ClientsModel} from "../../../../../models/clients.model";
import {SheetsService} from "../../../../../service/sheets.service";
import {SheetsModel} from "../../../../../models/sheets.model";

interface Exercise  {
  name: string;
  id?: number;
}

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
  ],
  templateUrl: './preview-sheet.component.html',
  styleUrl: './preview-sheet.component.css',
  providers: [MessageService]
})
export class PreviewSheetComponent implements  OnInit {
  @ViewChild('openDialog')
  dialog: ElementRef
  @Input() sheetInfo: SheetsModel;
  showPreviewSheet: boolean = false;
  exercises: ExerciseModel[]
  athlete: SheetsModel;
  clientInfo: ClientsModel;
  public sheetA: ExerciseModel[];
  public sheetB: ExerciseModel[];
  public sheetC: ExerciseModel[];
  public sheetD: ExerciseModel[];

  constructor(
              private athleteService: AthletesService,
              private sheetService: SheetsService,
              ) {
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

}
