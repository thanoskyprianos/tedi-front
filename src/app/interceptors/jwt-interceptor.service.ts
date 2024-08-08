import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserSessionService} from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private session: UserSessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.session.token) {
      req = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.session.token)
      })
    }

    return next.handle(req); // error interceptor will handle this
  }
}
