import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        RouterLink,
        ToastModule
    ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
