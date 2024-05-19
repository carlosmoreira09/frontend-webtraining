import { Routes } from '@angular/router';
import {AuthComponent} from "./components/views/auth/auth.component";
import {RegisterComponent} from "./components/views/register/register.component";
import {AtletasComponent} from "./components/admin/athlete/athlete.component";
import {ExercisesComponent} from "./components/admin/exercises/exercises.component";
import {SheetsComponent} from "./components/admin/sheets/sheets.component";
import {HomeComponent} from "./components/views/home/home.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'register', component: AuthComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'athletas', component: AtletasComponent
  },
  {
    path: 'sheets', component: SheetsComponent
  },
  {
    path: 'exercises/:type', component: ExercisesComponent
  }
];
