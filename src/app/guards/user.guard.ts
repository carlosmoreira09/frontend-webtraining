import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth/auth.service";
import {StorageService} from "../service/storage/storage.service";

export const UserGuard: CanActivateFn = (route, state) => {
  const storageService: StorageService = inject(StorageService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.getAccessLevel('admin')) {
    return true;
  }
  if (!authService.getAccessLevel('user')) {
    router.navigate(['/no-access']).then(
      () => {
        storageService.clean();
      }
    );
    return false;
  }
  return true
};
