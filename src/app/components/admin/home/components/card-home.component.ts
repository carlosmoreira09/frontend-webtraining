import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css'
})
export class CardHomeComponent {
  @Input() header: string;
  @Input() body: string;
  @Input() endpoint: string;
  @Input() imgPath: string;
  @Input() imgAlt: string;

}
