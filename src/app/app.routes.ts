import { Routes } from '@angular/router';
import {AuthComponent} from "./components/views/auth/auth.component";
import {RegisterComponent} from "./components/views/register/register.component";
import {AtletasComponent} from "./components/admin/athlete/athlete.component";
import {ExercisesComponent} from "./components/admin/exercises/exercises.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'athletas'
  },
  {
    path: 'auth', component: AuthComponent
  }, {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'athletas', component: AtletasComponent
  },
  {
    path: 'exercises/:type', component: ExercisesComponent
  }
];
