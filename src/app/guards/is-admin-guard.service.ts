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
import {filter, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuardService implements CanActivate {

  constructor(
    private session: UserSessionService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    MaybeAsync<GuardResult> {

    return this.session.userObs.pipe(
      filter(x => x === 'ok'),
      map(x => {
        if (this.session.user.role.name === 'ADMIN') {
          return true;
        } else {
          this.router.navigate([''])
          return false;
        }
      })
    )
  }
}
