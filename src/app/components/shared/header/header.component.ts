import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor() {
  }

}
