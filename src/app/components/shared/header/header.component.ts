import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ClientDTO} from "../../../models/auth.model";
import {StorageService} from "../../../service/storage.service";
import {Router, RouterLink} from "@angular/router";
import {AuthComponent} from "../../views/auth/auth.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    AuthComponent,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public loggedUser: ClientDTO;

  constructor(private storageService: StorageService, private router: Router,
              ) {}

  ngOnInit(): void {
    this.loggedUser = this.storageService.getItem('user')
    console.log(this.loggedUser);
  }

  logout() {
    this.navigate('auth').then(
      () => {
        this.storageService.clean();
        localStorage.clear();
        sessionStorage.clear();
      }
    )
  }
  navigate(endpoint: string) {
    return this.router.navigate([endpoint]);
  }
}
