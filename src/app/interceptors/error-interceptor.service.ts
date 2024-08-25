import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {IGNORE_AUTH, DID_REFRESH, UserSessionService} from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private session: UserSessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (!req.context.get(IGNORE_AUTH) && (error.status === 401 || error.status === 403)) {
        if (req.context.get(DID_REFRESH)) {
          setTimeout(() =>
            this.session.logout().subscribe(
              (_res) => {
                this.session.removeToken();
                location.reload();
              }), 1000
          );
        } else {
          this.session.refresh().subscribe({
            next: (res: any) => {
              this.session.setToken(
                res.body.accessToken,
                res.body.refreshToken);

              location.reload();
              next.handle(req); // try request with new tokens
            }
          })
        }

        return of();
      }

      return throwError(() => error );
    }));
  }
}
