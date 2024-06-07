import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {AthletesService} from "../../../../service/athletes.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {ClientsModel} from "../../../../models/clients.model";
import {DialogModule} from "primeng/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {StrongPasswordRegx} from "../../../../models/auth.model";


@Component({
  selector: 'app-modal-atleta',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule, HttpClientModule, CommonModule
  ],
  templateUrl: './modal-athlete.component.html',
  styleUrl: './modal-athlete.component.css',
  providers: [AthletesService,HttpClient]
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
  public modalidades = [
    {name: 'Hipertrofia', abbrev: '1'},
    {name: 'Emagrecimento', abbrev: '2'},
    {name: 'Fortalecimento', abbrev: '3'},
    {name: 'Tratamento de Lesões', abbrev: '4'},
  ];

  constructor(
              private formBuilder: FormBuilder,
              private athletesService: AthletesService,
              private router: Router) {}

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
      password: ['', [Validators.required,Validators.minLength(8)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(8)]],
      age: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      email: ['',[Validators.email, Validators.required] ],
      id_training: ['',[Validators.required]]
    });
  }
  getFormValues() {
    const fullName = this.getField('fullName')?.value;
    const password = this.getField('password')?.value;
    const passwordCheck = this.getField('passwordCheck')?.value;
    const age = this.getField('age')?.value;
    const phone = this.getField('phone')?.value;
    const email = this.getField('email')?.value;
    const id_training = this.getField('id_training')?.value;
    if (password !== passwordCheck) {
      this.formValid = true;
      this.errorMessage = 'Senhas não coincidem';
      return false;
    }
    let regxOneCarac = new RegExp("(?=.*[!@#$%^&*])");
    if (!regxOneCarac.test(password)) {
      this.formValid = true;
      this.errorMessage = 'Acrescente um caracter especial do tipo !@#$%^&* ';
      return false;
    }

    return {
      fullName: fullName,
      password: password,
      age: age,
      phone: phone,
      email: email,
      id_training: id_training,
    }
  }
  onSubmit() {
    const clientForm = this.getFormValues();
    console.log(clientForm)
  }
  navigate(endpoint: string) {
    return this.router.navigate([endpoint]);
  }
  getField(field: string) {
    return this.formClient.get(field);
  }

}
