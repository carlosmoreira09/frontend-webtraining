import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientsModel} from "../../../models/clients.model";
import {AthletesService} from "../../../service/athletes.service";
import {ModalAtletaComponent} from "./components/modal-athlete.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {RouterLink} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-athlete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    CommonModule,
    ModalAtletaComponent,
    RouterLink
  ],
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
  providers: [MessageService, ConfirmationService]
})
export class AtletasComponent implements OnInit {
  atletas: ClientsModel[];

  constructor(private clientService: AthletesService) {}
  ngOnInit() {
    this.listAllUsers();
  }
  listAllUsers() {
    return this.clientService.listAllAthletas().subscribe(
      (users: ClientsModel[]) => {
        this.atletas = users;
      }
    )
  }
}
