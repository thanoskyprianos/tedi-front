import {Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot} from "@angular/router";
import {UserModule} from "./user.module";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements OnInit, CanActivate {

  isLoggedIn: boolean = false;

  token!: string;
  userId!: number;

  user!: UserModule;

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.isLoggedIn = true;

      let userId = localStorage.getItem('userId');
      if (userId) {
        this.userId = parseInt(userId);
      }
    }

  }

  constructor() { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    let token = localStorage.getItem("token");

    return token != null || this.isLoggedIn;
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem("token", this.token);
  }

  saveUserId(userId: number) {
    this.userId = userId;
    localStorage.setItem("userId", this.userId.toString());
  }

  saveUser(user: UserModule) {
    this.user = user;
  }
}
