import { Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {AuthDTO, AuthPayload} from "../../../data/auth.model";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../../../service/storage.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    RouterLink,
    ToastModule
  ],
  providers: [AuthService, HttpClient, MessageService],
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

    const token = this.storageService.getUser();
    if (token) {

      this.authService.home(token).subscribe({
          next: (res) => {
            console.log(res);
          },
          complete: () => {
            this.navigate('home').then(
              (res) => {
                console.log(res)
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
          this.storageService.saveUser(payload);
          this.authService.home(payload).subscribe({
            next: (res) => {
              console.log(res);
            },
            complete: () => {
              this.navigate('home').then(
                (res) => {
                  console.log(res)
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
