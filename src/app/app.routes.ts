import { Routes } from '@angular/router';
import {AuthComponent} from "./components/views/auth/auth.component";
import {RegisterComponent} from "./components/views/register/register.component";
import {AtletasComponent} from "./components/admin/athlete/athlete.component";
import {ExercisesComponent} from "./components/admin/exercises/exercises.component";
import {SheetsComponent} from "./components/admin/sheets/sheets.component";
import {HomeComponent} from "./components/admin/home/home.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth', component: AuthComponent,
  },
  {
    path: 'home', component: HomeComponent, data: { loggedIn: true, homepage: true   }
  },
  {
    path: 'register', component: RegisterComponent, data: { loggedIn: true, homepage: false }
  },
  {
    path: 'athletas', component: AtletasComponent, data: { loggedIn: true, homepage: false }
  },
  {
    path: 'sheets', component: SheetsComponent, data: { loggedIn: true, homepage: false }
  },
  {
    path: 'exercises/:type', component: ExercisesComponent, data: { loggedIn: true, homepage: false }
  }
];
