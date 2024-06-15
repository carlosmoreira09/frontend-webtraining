import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ExerciseModel} from "../../../../../../models/exercise.model";

@Component({
  selector: 'app-header-table',
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
  templateUrl: '../header-component/header-table.component.html',
  providers: [MessageService]
})
export class HeaderTableComponent {
  @ViewChild('openDialog')
  dialog: ElementRef;
  @Input() training_id: string;
  exercises: ExerciseModel[]
  @Input() sheetA: ExerciseModel[];
  @Input() sheetB: ExerciseModel[];
  @Input() sheetC: ExerciseModel[];
  @Input() sheetD: ExerciseModel[];

  constructor() {
  }

}
