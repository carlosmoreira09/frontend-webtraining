import {Component, Input, OnInit} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {CommonModule, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ExerciseModel} from "../../../../../../models/exercise.model";

@Component({
  selector: 'app-training-table',
  standalone: true,
  imports: [
    DialogModule,
    MessageModule,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './training.component.html',
  providers: [MessageService]
})
export class TrainingComponent implements OnInit {

  @Input() sheet: ExerciseModel[];
  exercise: ExerciseModel;
  constructor() {
  }

  ngOnInit() {
  }
}
