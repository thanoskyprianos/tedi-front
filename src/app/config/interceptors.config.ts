import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorInterceptorService} from "../interceptors/error-interceptor.service";
import {JwtInterceptorService} from "../interceptors/jwt-interceptor.service";

export const interceptors= [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
];

