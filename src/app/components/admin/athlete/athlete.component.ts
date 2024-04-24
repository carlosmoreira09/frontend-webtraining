import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientsModel} from "../../../data/clients.model";
import {AtletasService} from "../../../service/atletas.service";
import {ModalAtletaComponent} from "./components/modal-athlete.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-athlete',
  standalone: true,
  imports: [
    ReactiveFormsModule, HttpClientModule, DialogModule, CommonModule, ModalAtletaComponent
  ],
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
  providers: [HttpClient, AtletasService]
})
export class AtletasComponent implements OnInit {
  atletas: ClientsModel[];

  constructor(private clientService: AtletasService) {}
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
