import {Injectable} from '@angular/core';
import {UserModule} from "../modules/user.module";
import {HttpClient, HttpContext, HttpContextToken} from "@angular/common/http";
import {properties} from "../config/properties.file";
import {UserFetcherService} from "./user-fetcher.service";
import {mockUser} from "../config/mock.user";
import {BehaviorSubject} from "rxjs";

// ability to ignore auth errors (checked by interceptor)
export const IGNORE_AUTH = new HttpContextToken(() => false)
export const DID_REFRESH = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  accessToken: string = '';
  refreshToken: string = '';
  user!: UserModule;

  subj = new BehaviorSubject('');
  userObs = this.subj.asObservable();

  constructor(
    private http: HttpClient,
    private fetcher: UserFetcherService,
  ) {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;

      // todo: delete in prod
      this.setUser(mockUser);

      setTimeout(() =>
      this.fetcher.self().subscribe(
        (res: any) => {
          this.setUser(res.body);
          this.subj.next('ok');
        }
      ))
    }
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string
  ) {
      const registerBody = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: phoneNumber
      };

      return this.http.post(properties.register, registerBody, { observe: 'response' });
  }

  login(email: string, password: string) {
    const loginBody = {
      email: email,
      password: password
    }

    return this.http.post(
      properties.endpoint + '/users/login', loginBody, {
        observe: 'response',
        context: new HttpContext().set(IGNORE_AUTH, true)
      });
  }

  logout() {
    const tokens = {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }

    return this.http.post(properties.endpoint + '/users/logout', tokens, { observe: 'response'});
  }

  refresh() {
    const tokens = {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }

    return this.http.post(properties.endpoint + '/users/refresh', tokens, {
      observe: 'response',
      context: new HttpContext().set(DID_REFRESH, true)
    });
  }

  setToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    localStorage.setItem('accessToken', this.accessToken);
    localStorage.setItem('refreshToken', this.refreshToken);
  }

  removeToken() {
    this.accessToken = '';
    this.refreshToken = '';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken')
  }

  setUser(userObj: any) {
    this.user = new UserModule(
      userObj.id,
      userObj.firstName,
      userObj.lastName,
      userObj.email,
      userObj.phoneNumber,
      userObj._links
    )
  }
}
