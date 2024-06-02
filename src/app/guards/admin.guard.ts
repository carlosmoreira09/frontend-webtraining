import {CanActivateFn, Router} from '@angular/router';

import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {StorageService} from "../service/storage.service";

export const AdminGuard: CanActivateFn = (route, state) => {
  const storageService: StorageService = inject(StorageService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  console.log('admin guard')
  if(!authService.getAccessLevel('admin')) {
    console.log('admin guard false')

    router.navigate(['/no-access']).then(
      () => {
      storageService.clean()
      }
    );
    return false;
  }
  return true

};
