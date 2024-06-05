import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../service/auth.service";
import {AuthRoles, ClientDTO, StrongPasswordRegx} from "../../../models/auth.model";
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
    DialogModule,
    NgClass
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;
  formValid: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              private storageService: StorageService,) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', []],
      password: ['', Validators.pattern(StrongPasswordRegx)],
      passwordCheck: [''],
      email: ['', []],
      fullName: ['', []],
    });
  }
  onSubmit() {
    const registerValues  = this.getFormValues();
    if(registerValues === undefined) {
      this.errorMessage = 'Senhas Não Coincidem'
      this.messageService.add({
        severity: 'error',
        key: 'tc',
        detail: 'Verifique seu formulário',
        life: 1500
      })
    } else {
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
          this.navigate('auth').then();
        }
      })
    }
  }
  checkPassword() {
    let pass = this.getField('password')?.value;
    let passwordRegx: RegExp = new RegExp(StrongPasswordRegx);
    const testPassword = passwordRegx.test(pass);
    if (!testPassword) {
      this.formValid = true;
      let regxUpperCase = new RegExp("^(?=.*[A-Z])");
      if (!regxUpperCase.test(pass)) {
        this.errorMessage = 'Acrescente uma letra maiuscula';
        return false;
      }
      let regxOneNumber = new RegExp("(.*[0-9].*)");
      if (!regxOneNumber.test(pass)) {
        this.errorMessage = 'Acrescente um número';
        return false;
      }
      let regxOneCarac = new RegExp("(?=.*[!@#$%^&*])");
      if (!regxOneCarac.test(pass)) {
        this.errorMessage = 'Acrescente um caracter especiak do tipo !@#$%^&* ';
        return false;
      }
      let regxNumberChar = new RegExp(".{8,}");
      if (!regxNumberChar.test(pass)) {
        this.errorMessage = 'Sua senha deve possui 8 caracter';
        return false;
      }
      if(pass !== this.getField('passwordCheck')?.value) {
        this.errorMessage = 'Senhas não Coincidem';
        return false;
      }
    }
    return true;
  }
  getFormValues(): ClientDTO | undefined {

    const username = this.getField('username')?.value;
    const checkPass = this.checkPassword();
    if(!checkPass) {
      this.registerForm.get('password')?.setValue('')
      this.registerForm.get('passwordCheck')?.setValue('')
      return
    }

    const email = this.getField('email')?.value;
    const fullName = this.getField('fullName')?.value;
    const password = this.getField('password')?.value;
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
