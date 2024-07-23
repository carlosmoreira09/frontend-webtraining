import {Routes} from '@angular/router';
import {AtletasComponent} from "./components/admin/athlete/athlete.component";
import {ExercisesComponent} from "./components/admin/exercises/exercises.component";
import {SheetsComponent} from "./components/admin/sheets/sheets.component";
import {HomeComponent} from "./components/admin/home/home.component";
import {AdminGuard} from "./guards/admin.guard";
import {ErrorComponent} from "./components/views/public/404/error404.component";
import {ErrorAuthorizeComponent} from "./components/views/public/401/error401.component";
import {AuthComponent} from "./components/views/auth/auth.component";
import {RegisterComponent} from "./components/admin/register/register.component";
import {ClientGuard} from "./guards/client.guard";
import {NewUserComponent} from "./components/admin/register/user-register/user-register.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";


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
    path: 'new-register',
    component: NewUserComponent,
    canActivate: [AdminGuard]

  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {loggedIn: true, homepage: true},
    canActivate: [ClientGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'athletas',
    children: [{
      path: '',
      component: AtletasComponent,
      data: {loggedIn: true, homepage: false},
      canActivate: [ClientGuard],
    },
      {
      path: 'profile',
      component: UserProfileComponent,
      data: {loggedIn: true, homepage: false},
      canActivate: [ClientGuard],
    }]

  },
  {
    path: 'sheets',
    component: SheetsComponent,
    data: {loggedIn: true, homepage: false},
    canActivate: [ClientGuard]

  },
  {
    path: 'exercises/:type',
    component: ExercisesComponent,
    data: {loggedIn: true, homepage: false},
    canActivate: [ClientGuard]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];
