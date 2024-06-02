import { Routes } from '@angular/router';
import {AtletasComponent} from "./components/admin/athlete/athlete.component";
import {ExercisesComponent} from "./components/admin/exercises/exercises.component";
import {SheetsComponent} from "./components/admin/sheets/sheets.component";
import {HomeComponent} from "./components/admin/home/home.component";
import {UserGuard} from "./guards/user.guard";
import {AdminGuard} from "./guards/admin.guard";
import {ErrorComponent} from "./components/views/error/404/error404.component";
import {ErrorAuthorizeComponent} from "./components/views/error/401/error401.component";
import {AuthComponent} from "./components/views/auth/auth.component";
import {RegisterComponent} from "./components/views/register/register.component";
import {ClientGuard} from "./guards/client.guard";


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'error-page',
    component: ErrorComponent
  },
  {
    path: 'no-access',
    component: ErrorAuthorizeComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { loggedIn: true, homepage: true   },
    canActivate:[ClientGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { loggedIn: true, homepage: false },
    canActivate:[AdminGuard]
  },
  {
    path: 'athletas',
    component: AtletasComponent,
    data: { loggedIn: true, homepage: false },
    canActivate:[ClientGuard]

  },
  {
    path: 'sheets',
    component: SheetsComponent,
    data: { loggedIn: true, homepage: false },
    canActivate:[ClientGuard]

  },
  {
    path: 'exercises/:type',
    component: ExercisesComponent,
    data: { loggedIn: true, homepage: false },
    canActivate:[ClientGuard]
  }
];
