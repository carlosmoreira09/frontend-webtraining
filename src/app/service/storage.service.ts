import { Injectable } from '@angular/core';
import {AuthPayload} from "../data/auth.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  USER_KEY = 'access-token';

  constructor() { }
  clean(): void {
    sessionStorage.clear();
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = sessionStorage.getItem(this.USER_KEY);
    return !!user;
  }
}
