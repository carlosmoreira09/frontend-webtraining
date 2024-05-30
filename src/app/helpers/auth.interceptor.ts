
import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {StorageService} from "../service/storage.service";
import {AuthRoles} from "../models/auth.model";
import {jwtDecode} from "jwt-decode";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem("access-token");
  const router = inject(Router);
  const authService = inject(StorageService);
  const auth = authService.getUser();
  const decode: AuthRoles = jwtDecode(auth)
  if(decode.exp > 0) {
    console.log('expirou');
  }
  if(!authToken) {
    return next(req)
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${JSON.parse(authToken)}`
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
