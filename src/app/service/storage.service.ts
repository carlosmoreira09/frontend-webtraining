import { Injectable } from '@angular/core';
import {setPostSignalSetFn} from "@angular/core/primitives/signals";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  USER_KEY = 'access-token';

  constructor() { }
  clean(): void {
    sessionStorage.clear();
  }

  public saveItemLocalStorage(user: any): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  public getUserLocalStorage(): any {
    const user = localStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  public isLoggedInLocal(): boolean {
    const user = localStorage.getItem(this.USER_KEY);
    return !!user;
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

  public saveItem(key: string, item: any): void {
    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, JSON.stringify(item));
  }
  public getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    if(item) {
      return JSON.parse(item)
    }
      return null;
  }

  public isLoggedIn(): boolean {
    const user = sessionStorage.getItem(this.USER_KEY);
    return !!user;
  }
}
