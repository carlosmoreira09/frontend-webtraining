import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CardHomeComponent} from "./components/card-home.component";
import {RouterLink} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardHomeComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }
  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      initFlowbite();
    }
  }
}
