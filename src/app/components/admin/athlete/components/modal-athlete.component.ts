import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {AtletasService} from "../../../../service/atletas.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientsModel} from "../../../../data/clients.model";
import {DialogModule} from "primeng/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-modal-atleta',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule, HttpClientModule, CommonModule
  ],
  templateUrl: './modal-athlete.component.html',
  styleUrl: './modal-athlete.component.css',
  providers: [AtletasService,HttpClient]
})
export class ModalAtletaComponent implements AfterViewInit {
  @ViewChild('openDialog')
  dialog!: ElementRef;

  @Input() service!: string;
  @Input() clientInfo: ClientsModel | undefined;
  atletas: ClientsModel[] | undefined;
  showCreateUser = false;
  showEditUser = false;

  public modalidades = [
    {name: 'Hipertrofia', abbrev: '1'},
    {name: 'Emagrecimento', abbrev: '2'},
    {name: 'Fortalecimento', abbrev: '3'},
    {name: 'Tratamento de Lesões', abbrev: '4'},
  ];
  public formClient!: FormGroup;
  constructor(private clientService: AtletasService,
              private formBuilder: FormBuilder) {}
  openDialogCreate() {
    this.showCreateUser = !this.showCreateUser;
  }
  openDialogEdit() {
    this.showEditUser = !this.showEditUser;
  }
  initControlForm() {
    return this.formBuilder.group({
      fullName: ['', Validators.required],
      age: [''],
      phone: [''],
      email: [''],
      id_training: ['']
    });
  }

  ngAfterViewInit() {
    this.formClient = this.initControlForm();
    this.listAllUsers();
  }
  listAllUsers() {
    return this.clientService.listAllUser().subscribe(
      (users) => {
        this.atletas = users;
      }
    )
  }
}
