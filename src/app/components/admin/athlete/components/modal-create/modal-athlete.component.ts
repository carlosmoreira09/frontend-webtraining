import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AthletesService} from "../../../../../service/athletes/athletes.service";
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

  clientInfo: ClientsModel;
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
  }

  openDialogCreate() {
    this.showCreateUser = !this.showCreateUser;
    this.formClient = this.initControlForm();

  }

  openDialogEdit() {
    this.showEditUser = !this.showEditUser;
    this.formClient = this.initEditControlForm();
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

  initEditControlForm() {
    return this.formBuilder.group({
      fullName: [this.clientInfo.fullName, [Validators.required]],
      age: [this.clientInfo.age, [Validators.required]],
      phone: [this.clientInfo.phone, [Validators.required]],
      email: [this.clientInfo.email, [Validators.email, Validators.required]],
      training_type: [this.clientInfo.training_type, [Validators.required]],
      id_client: [this.clientInfo.id_client]
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

  getValuesEdit() {
    const fullName = this.getField('fullName')?.value;
    const age = this.getField('age')?.value;
    const phone = this.getField('phone')?.value;
    const email = this.getField('email')?.value;
    const training_type = this.getField('training_type')?.value;
    const id_client = this.getField('id_client')?.value;
    return {
      id_client: id_client,
      fullName: fullName,
      age: age,
      training_type: training_type,
      phone: phone,
      email: email,
    }
  }

  onSubmitEdit() {
    let returnMessage: ReturnMessage;
    const editAthlete = this.getValuesEdit();
    this.athletesService.updateAthlete(editAthlete).subscribe({
      next: (value) => {
        returnMessage = value;
      },
      complete: () => {
        this.showEditUser = false;
        this.athleteComponent.listAllUsers();
        this.addMessage('success', returnMessage.message);
      }
    })
  }

  addMessage(type: string, message: string): void {
    return this.messageService.add({
      severity: type,
      key: 'tc',
      detail: message,
      life: 1500,
    })
  }

  onCancelEdit() {
    this.showEditUser = false;
    this.initEditControlForm();

  }

  onSubmit() {
    let returnMessage: ReturnMessage;
    const clientForm = this.getFormValues();
    if (!clientForm) {
      this.addMessage('error', 'Verifique o Dados')
      return
    }
    this.athletesService.create(clientForm).subscribe({
      next: (value) => {
        returnMessage = value;
      },
      error: (err: ReturnMessage) => {
        this.addMessage('error', err.message)
      },
      complete: () => {
        this.showCreateUser = false;
        this.athleteComponent.listAllUsers();
        this.addMessage('success', returnMessage.message);
      }
    })
  }

  clearModal() {
    this.initControlForm();
    this.showCreateUser = false;
  }

  navigate(endpoint: string) {
    return this.router.navigate([endpoint]);
  }

  getField(field: string) {
    return this.formClient.get(field);
  }

}
