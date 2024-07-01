import {HttpErrorResponse, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {StorageService} from "../service/storage/storage.service";
import {AuthRoles} from "../models/auth.model";
import {jwtDecode} from "jwt-decode";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const router: Router = inject(Router);
  const storageService = inject(StorageService);
  const auth = storageService.getUser();
  const authLocal = storageService.getUserLocalStorage()
  if (!req.headers.has('enctype')) {
    req.headers.set('Content-Type', 'application/json');
  }
  if (req.headers.has('enctype')) {
    req.headers.delete('Content-Type');
  }
  if (!auth) {
    router.navigate(['auth']).then(
      () => {
        storageService.clean();
      }
    )
  }
  if (!authLocal && !auth) {
    router.navigate(['auth']).then(
      () => {
        storageService.clean();
      }
    )
  }
  if (auth) {
    const decodetoken: AuthRoles = jwtDecode(auth.toString());
    const dateNow = new Date();
    const expirationTime = new Date(decodetoken.exp * 1000)
    if (dateNow > expirationTime) {
      return next(req).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              router.navigate(['auth']).then(
                () => {
                  storageService.clean();
                }
              )
            }
          }
          return throwError(() => err);
        }));
    }
  }
  if (authLocal) {
    const decodetoken: AuthRoles = jwtDecode(authLocal.toString());
    const dateNow2 = new Date();
    const expirationTime = new Date(decodetoken.exp * 1000)
    if (dateNow2 > expirationTime) {
      return next(req).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              router.navigate(['auth']).then(
                () => {
                  storageService.clean();
                }
              )
            }
          }
          return throwError(() => err);
        }));
    }
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth ? auth : authLocal}`
    }
  });
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
