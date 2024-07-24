import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CardHomeComponent} from "./components/card-home.component";
import {RouterLink} from "@angular/router";
import {isPlatformBrowser, NgClass} from "@angular/common";
import {initFlowbite} from "flowbite";
import {StorageService} from "../../../service/storage/storage.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {AuthRoles} from "../../../models/auth.model";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardHomeComponent,
    RouterLink,
    ToastModule,
    NgClass
  ],
  providers: [MessageService, StorageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  isUser: boolean = false;
  isClient: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private storageService: StorageService,) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
    console.log(this.getAdminContact())
    const token = this.storageService.getUser();
    const tokenLocal = this.storageService.getUserLocalStorage();
    let tokenExist = tokenLocal ? tokenLocal : token
    const authRoles: AuthRoles = jwtDecode(tokenExist);
    authRoles.role === 'admin' ? this.isAdmin = true : this.isUser = true;
  }
  getAdminContact(): string {
    const token = this.storageService.getItem('user');
    const tokenLocal = this.storageService.getItemLocalStorage('user');
    let tokenExist = tokenLocal ? tokenLocal : token
    return "https://wa.me/55"+tokenExist.phone.toString().replace('-', '')+"?text="+this.createMessageWhatsApp();
  }
  createMessageWhatsApp(): string {
    const token = this.storageService.getItem('user');
    const tokenLocal = this.storageService.getItemLocalStorage('user');
    let tokenExist = tokenLocal ? tokenLocal : token
    const name = tokenExist.fullName;
    return "Olá " + name + ". Gostaria de tirar uma dúvida com você."
  }
}
