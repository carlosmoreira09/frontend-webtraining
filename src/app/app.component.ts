import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {FooterComponent} from "./components/shared/footer/footer.component";
import {HeaderComponent} from "./components/shared/header/header.component";
import {MenuComponent} from "./components/shared/menu/menu.component";
import {initFlowbite} from "flowbite";
import {isPlatformBrowser, NgClass, NgIf} from "@angular/common";
import {filter, map, switchMap} from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    DialogModule,
    ButtonModule,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public loggedIn: boolean = false;
  public homepage: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              activatedRoute: ActivatedRoute,
              router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(switchMap((route) => route.data))
      .subscribe((event: any) => {
        this.loggedIn = event['loggedIn'];
        (event['homepage']) ? this.homepage = true : this.homepage = false;

      });

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
