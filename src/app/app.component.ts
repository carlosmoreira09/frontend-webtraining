import {Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {FooterComponent} from "./components/shared/footer/footer.component";
import {HeaderComponent} from "./components/shared/header/header.component";
import {MenuComponent} from "./components/shared/menu/menu.component";
import {initFlowbite} from "flowbite";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DialogModule, ButtonModule, FooterComponent, HeaderComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) initFlowbite();
  }
}
