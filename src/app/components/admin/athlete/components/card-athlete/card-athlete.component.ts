import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-card-athlete',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './card-athlete.component.html',
  providers: []
})
export class CardAthleteComponent {
  @Input() title: string;

  constructor() {
  }


}
