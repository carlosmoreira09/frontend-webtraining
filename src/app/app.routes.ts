import { Routes } from '@angular/router';
import {AuthComponent} from "./components/views/auth/auth.component";
import {RegisterComponent} from "./components/views/register/register.component";
import {AtletasComponent} from "./components/admin/athlete/athlete.component";
import {ChestComponent} from "./components/admin/exercises/components/chest/chest.component";
import {StrengthenComponent} from "./components/admin/exercises/components/strengthen/strengthen.component";
import {AbdomenComponent} from "./components/admin/exercises/components/abdomen/abdomen.component";
import {BackLegComponent} from "./components/admin/exercises/components/back-leg/back-leg.component";
import {LegComponent} from "./components/admin/exercises/components/leg/leg.component";
import {ArmComponent} from "./components/admin/exercises/components/arm/arm.component";
import {BackComponent} from "./components/admin/exercises/components/back/back.component";

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
  },{
    path: 'exercises',
    children: [
      {
        path: 'chest', component: ChestComponent
      },
      {
        path: 'back', component: BackComponent
      },
      {
        path: 'arm', component: ArmComponent
      },
      {
        path: 'leg', component: LegComponent
      },
      {
        path: 'back-leg', component: BackLegComponent
      },
      {
        path: 'abdomen', component: AbdomenComponent
      },
      {
        path: 'strengthen', component: StrengthenComponent
      }
    ]
  }
];
