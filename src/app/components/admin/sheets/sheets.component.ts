import {Component, OnInit} from '@angular/core';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ModalExercisesComponent} from "../exercises/components/modal-exercises/modal-exercises.component";
import {NgForOf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {SheetsService} from "../../../service/sheets.service";
import {SheetsModel} from "../../../data/sheets.model";
import {ModalSheetComponent} from "./components/modal-sheet/modal-sheet.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sheets',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    ModalExercisesComponent,
    NgForOf,
    ToastModule,
    ModalSheetComponent
  ],
  templateUrl: './sheets.component.html',
  styleUrl: './sheets.component.css',
  providers: [MessageService, ConfirmationService]

})
export class SheetsComponent implements  OnInit {

  sheets: SheetsModel[];
   constructor(private sheetsService: SheetsService){}
  ngOnInit() {
    this.listSheets();
  }
  listSheets() {
      this.sheetsService.listSheets().subscribe(
       (res: SheetsModel[]) => {
         this.sheets = res;
       }
     );
  }
}
