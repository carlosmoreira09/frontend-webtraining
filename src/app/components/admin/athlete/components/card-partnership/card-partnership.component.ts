import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {CommonModule, NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-card-athlete',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule, CommonModule, NgOptimizedImage
  ],
  templateUrl: './card-partnership.component.html',
  providers: []
})
export class CardPartnershipComponent {
  @Input() imgSrc: string;
  @Input() alt: string;
  @Input() width: number;
  @Input() height: number;

  constructor() {
  }
}
