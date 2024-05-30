import { Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {AuthDTO, AuthPayload, AuthRoles} from "../../../models/auth.model";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../../../service/storage.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    RouterLink,
    ToastModule
  ],
  providers: [AuthService, HttpClient, MessageService, AuthComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent  implements OnInit {
  authForm: UntypedFormGroup;
  constructor(private formBuilder: FormBuilder,
              private storageService: StorageService,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: [''],
    });

    if (this.storageService.isLoggedIn()) {
      const token = this.storageService.getUser();
      this.authService.home(token).subscribe({
          next: (res) => {
            console.log(res);
          },
          complete: () => {
            this.navigate('home').then(
              (res) => {
                const decoded = jwtDecode(token);
                console.log(decoded);
              }
            )
          }
        }
      )
    }
  }

  getFormValues(): AuthDTO {
    const username = this.getField('username')?.value;
    const password = this.getField('password')?.value;

    return {
      username: username,
      password: password,
    }
  }
  onSubmit() {
    let payload: AuthPayload;
    const authData: AuthDTO = this.getFormValues()
    this.authService.login(authData).subscribe(
      {
        next: (value) => {
          payload = value;
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            key: 'tc',
            detail: err.message,
            life: 1500,
          })
        },
        complete: () => {
          this.storageService.saveUser(payload.accessToken);
          this.authService.home(payload).subscribe({
            next: (res) => {
              console.log(res);
            },
            complete: () => {
              this.navigate('home').then(
                (res) => {
                  console.log(res)
                  const decoded: AuthRoles = jwtDecode(payload.accessToken);
                  console.log(decoded.exp);
                  console.log(decoded.role);

                }
              )
            }
            }
          )
        }
      }
    )
  }

  navigate(endpoint: string) {
    return this.router.navigate([endpoint]);
  }
  getField(field: string) {
    return this.authForm.get(field);
  }
}
