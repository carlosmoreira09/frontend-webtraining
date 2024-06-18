import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AthletesService} from "../../../../../service/athletes.service";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {ClientsModel} from "../../../../../models/clients.model";
import {DialogModule} from "primeng/dialog";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {SpecialCharacterRegx} from "../../../../../models/auth.model";

import {MessageService} from "primeng/api";
import {AtletasComponent} from "../../athlete.component";
import {ReturnMessage} from "../../../../../models/exercise.model";


@Component({
  selector: 'app-modal-atleta',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './modal-athlete.component.html',
  styleUrl: './modal-athlete.component.css',
  providers: [AthletesService, HttpClient, MessageService,]
})
export class ModalAtletaComponent implements AfterViewInit {
  @ViewChild('openDialog')
  dialog!: ElementRef;

  @Input() service!: string;
  @Input() clientInfo: ClientsModel;
  showCreateUser = false;
  showEditUser = false;
  formClient: UntypedFormGroup;
  formValid: boolean = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private athletesService: AthletesService,
    private router: Router,
    private messageService: MessageService,
    private athleteComponent: AtletasComponent,
  ) {
  }

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
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(8)]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      training_type: ['', [Validators.required]]
    });
  }

  getFormValues() {
    const fullName = this.getField('fullName')?.value;
    const password = this.getField('password')?.value;
    const passwordCheck = this.getField('passwordCheck')?.value;
    const age = this.getField('age')?.value;
    const phone = this.getField('phone')?.value;
    const email = this.getField('email')?.value;
    const training_type = this.getField('training_type')?.value;
    if (password !== passwordCheck) {
      this.formValid = true;
      this.errorMessage = 'Senhas não coincidem';
      return false;
    }
    let regxOneCarac = new RegExp(SpecialCharacterRegx);
    if (!regxOneCarac.test(password)) {
      this.formValid = true;
      this.errorMessage = 'Acrescente um caracter especial do tipo !@#$%^&* ';
      return false;
    }
    return {
      fullName: fullName,
      password: password,
      age: age,
      training_type: training_type,
      phone: phone,
      email: email,
    }
  }

  onSubmit() {

    const clientForm = this.getFormValues();
    if (!clientForm) {
      this.messageService.add({
        severity: 'error',
        key: 'tc',
        detail: 'Confirá o formulário',
        life: 1500,
      })
      return
    }
    this.athletesService.create(clientForm).subscribe({

      next: (client) => {
        this.showCreateUser = false;
        this.athleteComponent.listAllUsers();
        this.messageService.add({
          severity: 'success',
          key: 'tc',
          detail: client.message,
          life: 1500,
        })
      },
      error: (err: ReturnMessage) => {
        this.messageService.add({
          severity: 'error',
          key: 'tc',
          detail: err.message,
          life: 1500,
        })
      }
    })
  }

  navigate(endpoint: string) {
    return this.router.navigate([endpoint]);
  }

  getField(field: string) {
    return this.formClient.get(field);
  }

}
