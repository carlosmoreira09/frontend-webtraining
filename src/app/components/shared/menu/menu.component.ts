import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";


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
export class MenuComponent {
  constructor() {}
}
