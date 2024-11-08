import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {UserSessionService} from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutService implements CanActivate {

  constructor(
    private session: UserSessionService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    MaybeAsync<GuardResult> {
    if (!this.session.accessToken) {
      return true;
    }

    this.router.navigate(['/home-page'])
    return false;
  }
}
