import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-abdomen',
  standalone: true,
  imports: [
    DropdownModule,
    NgForOf
  ],
  templateUrl: './abdomen.component.html',
  styleUrl: './abdomen.component.css'
})
export class AbdomenComponent {

}
