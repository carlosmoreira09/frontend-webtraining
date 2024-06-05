import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {UserInfo} from "../../../models/auth.model";
import {StorageService} from "../../../service/storage.service";
import {Router} from "@angular/router";
import {AuthComponent} from "../../views/auth/auth.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    AuthComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public loggedUser: UserInfo;

  constructor(private storageService: StorageService, private router: Router,
              ) {}

  ngOnInit(): void {
    this.loggedUser = this.storageService.getItem('user')
    console.log(this.loggedUser.fullName)
  }

  logout() {
    this.navigate('auth').then(
      () => {
        this.storageService.clean();
      }
    )
  }
  navigate(endpoint: string) {
    return this.router.navigate([endpoint]);
  }
}
