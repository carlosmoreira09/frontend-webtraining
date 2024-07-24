import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {initFlowbite} from "flowbite";
import {AuthRoles} from "../../../models/auth.model";
import {jwtDecode} from "jwt-decode";
import {StorageService} from "../../../service/storage/storage.service";


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: []
})
export class MenuComponent implements OnInit {
  isUser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private storageService: StorageService) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
    const token = this.storageService.getItem('user');
    const tokenLocal = this.storageService.getItemLocalStorage('user');
    let tokenExist = tokenLocal ? tokenLocal : token
    return tokenExist.userType === 'user'
    }
}
