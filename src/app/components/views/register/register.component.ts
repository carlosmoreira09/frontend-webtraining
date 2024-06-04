import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../service/auth.service";
import {AuthDTO, AuthRoles, ClientDTO} from "../../../models/auth.model";
import {ReturnMessage} from "../../../models/exercise.model";
import {StorageService} from "../../../service/storage.service";
import {MessageModule} from "primeng/message";
import {DialogModule} from "primeng/dialog";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
    MessageModule,
    NgIf,
    DialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;
  formValid: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              private storageService: StorageService,) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [''],
      passwordCheck: [''],
      email: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const registerValues  = this.getFormValues();
      const authRoles: AuthRoles = jwtDecode(this.storageService.getUser())

      this.authService.register(registerValues, authRoles.role).subscribe({
        next: (res: ReturnMessage) => {
          if(res.status !== 200) {
            this.messageService.add({
              severity: 'error',
              key: 'tc',
              detail: res.message,
              life: 1500
            })
          }
          this.messageService.add({
            severity: 'success',
            key: 'tc',
            detail: res.message,
            life: 1500
          })
        },
        error: (err: ReturnMessage) => {
          this.messageService.add({
            severity: 'error',
            key: 'tc',
            detail: err.message,
            life: 1500
          })
        },
        complete: () => {
          this.storageService.clean();
          this.navigate('auth').then()
        }
      })
    }
  }
  getFormValues(): ClientDTO | undefined {

    const username = this.getField('username')?.value;
    const password = this.getField('password')?.value;
    const confirmPassword = this.getField('password')?.value;

    const email = this.getField('email')?.value;
    const fullName = this.getField('fullName')?.value;
    if(password !== confirmPassword) {
      this.formValid = true;
      this.messageService.add({
        severity: 'error',
        key: 'tc',
        detail: 'Erro no Formulário',
        life: 1500
      })
      return
    }

    return {
      username: username,
      fullName: fullName,
      email: email,
      password: password,
      userType: 'client',
      isActive: true,
      paymentStatus: 'Nao Pago'
    }
  }
  navigate(endpoint: string) {
    return this.router.navigate([endpoint]);
  }
  getField(field: string) {
  return this.registerForm.get(field);
  }
}
