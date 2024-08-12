import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {UserSessionService} from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private session: UserSessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error)

      if (error.status === 401 || error.status === 403) {
        this.session.logout().subscribe((res) => {
          this.session.logout().subscribe();
          location.reload();
        });
      }

      return throwError(() =>
        new Error(error.message || error.statusText));
    }));
  }
}
