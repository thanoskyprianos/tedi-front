import {Injectable} from '@angular/core';
import {UserModule} from "../modules/user/user.module";
import {HttpClient} from "@angular/common/http";
import {properties} from "../config/properties.file";
import {UserFetcherService} from "./user-fetcher.service";
import {mockUser} from "../config/mock.user";

@Injectable({
  providedIn: 'root'
})

export class UserSessionService {
  token: string = '';
  user!: UserModule;

  constructor(
    private http: HttpClient,
    private fetcher: UserFetcherService
  ) {
    let token = localStorage.getItem("token");
    if (token) {
      this.token = token;

      // todo: delete in prod
      this.setUser(mockUser);

      setTimeout(() =>
      this.fetcher.self().subscribe(
        (res: any) => {
          this.setUser(res.body);
        }
      ))
    }
  }

  updateAboutMe() {
  }

  uploadImage(avatarUrl: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(avatarUrl, formData);
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

    return this.http.post(properties.endpoint + '/users/login', loginBody, { observe: 'response'});
  }

  logout() {
    return this.http.get(properties.endpoint + '/users/logout',  { observe: 'response'});
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  removeToken() {
    this.token = '';
    localStorage.removeItem('token');
  }

  setUser(userObj: any) {
    this.user = new UserModule(
      userObj.firstName,
      userObj.lastName,
      userObj.email,
      userObj.phoneNumber,
      userObj.links
    )
  }
}
