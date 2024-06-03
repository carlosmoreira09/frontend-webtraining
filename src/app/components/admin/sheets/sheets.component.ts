import {Component, OnInit} from '@angular/core';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ModalExercisesComponent} from "../exercises/components/modal-exercises/modal-exercises.component";
import {NgForOf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {SheetsService} from "../../../service/sheets.service";
import {SheetsModel} from "../../../models/sheets.model";
import {ModalSheetComponent} from "./components/modal-sheet/modal-sheet.component";
import {initFlowbite} from "flowbite";
import {ReturnMessage} from "../../../models/exercise.model";
import {MessagesModule} from "primeng/messages";

@Component({
  selector: 'app-sheets',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    ModalExercisesComponent,
    NgForOf,
    ToastModule,
    MessagesModule,
    ModalSheetComponent
  ],
  templateUrl: './sheets.component.html',
  styleUrl: './sheets.component.css',
  providers: [MessageService, ConfirmationService]

})
export class SheetsComponent implements  OnInit {

  sheets: SheetsModel[];
   constructor(private sheetsService: SheetsService,
               private messageService: MessageService,
               private confirmationService: ConfirmationService){}
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
  deleteSheet(id: number | undefined) {
     this.sheetsService.delete(id).subscribe({
       next: (res: ReturnMessage) => {
         this.messageService.add({
           key: 'tc',
           severity: 'success',
           detail: res.message,
           life: 1500
         });
       },
       error: (res: ReturnMessage) => {
         this.messageService.add({
           key: 'tc',
           severity: 'error',
           detail: res.message,
           life: 1500
         });
       },
       complete: () => {
         this.listSheets()
       }
     });
  }
  confirm(event: Event, id: number | undefined) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você deseja deletar essa planilha?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"m-2 p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.deleteSheet(id);
        this.listSheets();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Planilha Deletada', life: 1500 });
      },
      reject: () => {
        this.listSheets();
      }
    });
  }
}
