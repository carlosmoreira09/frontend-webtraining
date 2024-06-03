import {Component, OnInit} from '@angular/core';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ModalExercisesComponent} from "../exercises/components/modal-exercises/modal-exercises.component";
import {NgForOf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {SheetsService} from "../../../service/sheets.service";
import {SheetsModel} from "../../../models/sheets.model";
import {ModalSheetComponent} from "./components/modal-sheet/modal-sheet.component";
import {HttpClient} from "@angular/common/http";
import {initFlowbite} from "flowbite";
import {ReturnMessage} from "../../../models/exercise.model";

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
   constructor(private sheetsService: SheetsService,
               private messageService: MessageService,){}
  ngOnInit() {
    initFlowbite();
    this.listSheets();
  }
  listSheets() {
      this.sheetsService.listSheets().subscribe(
       (res: SheetsModel[]) => {
         this.sheets = res;
       }
     );
  }
  delete(id: number) {
     this.sheetsService.delete(id).subscribe(
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
}
