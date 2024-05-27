import { Component } from '@angular/core';
import {ClientsModel} from "../../../data/clients.model";
import {FormBuilder, Validators} from "@angular/forms";
import {AtletasService} from "../../../service/atletas.service";
import {AtletasComponent} from "../athlete/athlete.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
