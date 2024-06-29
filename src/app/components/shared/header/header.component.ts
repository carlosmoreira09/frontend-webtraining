import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {ClientDTO} from "../../../models/auth.model";
import {StorageService} from "../../../service/storage/storage.service";
import {Router, RouterLink} from "@angular/router";
import {AuthComponent} from "../../views/auth/auth.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    AuthComponent,
    RouterLink,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public loggedUser: ClientDTO;
  constructor(private storageService: StorageService, private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loggedUser = this.storageService.getItem('user')
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
