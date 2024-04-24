import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ExercisesComponent} from "../../admin/exercises/exercises.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ExercisesComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [ExercisesComponent]
})
export class MenuComponent {

  constructor() {
  }


}
