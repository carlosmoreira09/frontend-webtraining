
import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {Component, inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {StorageService} from "../service/storage.service";
import {AuthRoles} from "../models/auth.model";
import {jwtDecode} from "jwt-decode";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const router: Router = inject(Router);
  const storageService = inject(StorageService);
  const auth = storageService.getUser();
  if(!auth) {
    router.navigate(['auth']).then(
      () => {
        storageService.clean();
      }
    )
  }
  if(auth) {
    const decode: AuthRoles = jwtDecode(auth.toString())
    const dateNow = new Date();
    const expirationTime = new Date(decode.exp*1000)
  if(dateNow > expirationTime) {
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
      }))
    }
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth}`
    }
  });
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
         router.navigate(['no-access']).then()
        }
      } else {
        router.navigate(['error-page']).then()
      }
      return throwError(() => err);
    })
  );
};
