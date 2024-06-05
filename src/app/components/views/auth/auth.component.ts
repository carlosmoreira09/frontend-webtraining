import { Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {HttpClient} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {StorageService} from "../../../service/storage.service";
import {AuthService} from "../../../service/auth.service";
import {AuthDTO, AuthPayload, AuthRoles, UserInfo} from "../../../models/auth.model";
import {HeaderComponent} from "../../shared/header/header.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    RouterLink,
    ToastModule
  ],
  providers: [HttpClient, MessageService, AuthComponent, StorageService, AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent  implements OnInit {
  authForm: UntypedFormGroup;
  public user: UserInfo;

  constructor(private formBuilder: FormBuilder,
              private storageService: StorageService,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              ) {

  }

  ngOnInit() {

    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: [''],
    });
    if (this.storageService.isLoggedIn()) {
      const token = this.storageService.getUser();
      this.authService.home(token).subscribe({
          next: (res: UserInfo) => {
            this.user = res;
          },
          complete: () => {
            this.storageService.saveItem('user', this.user);
            this.navigate('home').then(
              () => {
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
        next: (value: any) => {
          payload = value;
        },
        error: (err: { message: any; }) => {
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
              next: (res: UserInfo) => {
                this.user = res;
              },
            complete: () => {
              this.storageService.saveItem('user', this.user);
              this.navigate('home').then(
                () => {
                }
              )
            }
            }
          )
        }
      }
    );
  }

  register() {
    let payload: AuthPayload;
    const authData: AuthDTO = this.getFormValues()
    this.authService.login(authData).subscribe(
      {
        next: (value: any) => {
          payload = value;
        },
        error: (err: { message: any; }) => {
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
                next: (res: UserInfo) => {
                  this.user = res;
              },
              complete: () => {
                this.storageService.saveItem('user', this.user);
                  const token = this.storageService.getUser();
                  const authRoles: AuthRoles = jwtDecode(token);
                  if (authRoles.role === 'admin') {
                    this.navigate('register').then()
                  } else {
                    this.navigate('no-access').then()
                  }
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
