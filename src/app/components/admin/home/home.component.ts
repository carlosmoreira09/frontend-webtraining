import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CardHomeComponent} from "./components/card-home.component";
import {Router, RouterLink} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {initFlowbite} from "flowbite";
import {StorageService} from "../../../service/storage.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardHomeComponent,
    RouterLink,
    ToastModule
  ],
  providers: [MessageService,StorageService],
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
