import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {initFlowbite} from "flowbite";
import {StorageService} from "../../../service/storage/storage.service";
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    SidebarModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: []
})
export class MenuComponent implements OnInit {
  isUser: boolean = false;
  isClient: boolean = false;
  sidebarVisible: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private router: Router,
              private storageService: StorageService) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
    const token = this.storageService.getItem('user');
    const tokenLocal = this.storageService.getItemLocalStorage('user');
    let tokenExist = tokenLocal ? tokenLocal : token
    if(tokenExist.userType === 'admin') {
      return true;
    }
    return tokenExist.userType === 'user'? this.isUser = true : this.isClient = true;
    }

}
