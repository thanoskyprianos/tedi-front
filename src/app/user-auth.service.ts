import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements CanActivate {

  isLoggedIn: boolean = true;

  constructor() { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    return this.isLoggedIn;
  }
}
