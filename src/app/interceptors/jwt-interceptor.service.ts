import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {DID_REFRESH, UserSessionService} from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private session: UserSessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(DID_REFRESH) && this.session.refreshToken) {{
      req = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.session.refreshToken)
      })
    }}
    else if (this.session.accessToken) {
      req = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.session.accessToken)
      })
    }

    return next.handle(req); // error interceptor will handle this
  }
}
