import { Component } from '@angular/core';
import {ArmComponent} from "./components/arm/arm.component";

@Component({
  selector: 'app-exercicios',
  standalone: true,
  imports: [
    ArmComponent
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {

}
