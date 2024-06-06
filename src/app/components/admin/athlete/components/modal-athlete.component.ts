import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {AtletasService} from "../../../../service/atletas.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {ClientsModel} from "../../../../models/clients.model";
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
  @Input() clientInfo: ClientsModel;
  showCreateUser = false;
  showEditUser = false;
  formClient: UntypedFormGroup;

  public modalidades = [
    {name: 'Hipertrofia', abbrev: '1'},
    {name: 'Emagrecimento', abbrev: '2'},
    {name: 'Fortalecimento', abbrev: '3'},
    {name: 'Tratamento de Lesões', abbrev: '4'},
  ];
  constructor(
              private formBuilder: FormBuilder) {}

  ngAfterViewInit() {
    this.formClient = this.initControlForm();
  }

  openDialogCreate() {
    this.showCreateUser = !this.showCreateUser;
  }
  openDialogEdit() {
    this.showEditUser = !this.showEditUser;
  }
  initControlForm() {
    return this.formBuilder.group({
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      age: [''],
      phone: [''],
      email: [''],
      id_training: ['']
    });
  }
  onSubmit() {

  }

}
