import { Injectable } from '@angular/core';
import {UserModule} from "../modules/user/user.module";
import {HttpClient} from "@angular/common/http";
import {properties} from "../properties.file";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  token: string = '';
  user!: UserModule;

  constructor(
    private http: HttpClient,
    private router: Router) {
    let token = localStorage.getItem("token");
    if (token) {
      this.token = token;

      let user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user) as UserModule;
      }
    }
  }

  signup(email: string, password: string, name: string, surname: string,
    confirmPassword: string, phoneNumber: number) {
    
      const signUpData = {
        email, password,
        name, surname,
        confirmPassword, phoneNumber
      };

      this.http.post(properties.endpoint + '/users/signup',
        signUpData, { observe: 'response' })
      
      .subscribe((response: any) => {
        if (response.status === 201) {
          
          this.token = response.body.jwt.token;
          localStorage.setItem('token', this.token);

          this.user = response.body.user as UserModule;
          localStorage.setItem('user', JSON.stringify(this.user));

          this.router.navigate(['/home-page']);

        } else {

          throw new Error(response.statusText);

        }
      });

    }

  login(email: string, password: string) {
    this.http.post(properties.endpoint + '/users/login',
      {email: email, password: password},
      { observe: 'response'})
      .subscribe((response: any) => {
          if (response.status === 200) {
            this.token = response.body.jwt.token;
            localStorage.setItem('token', this.token);

            this.user = response.body.user as UserModule;
            localStorage.setItem('user', JSON.stringify(this.user));

            this.router.navigate(['/home-page']);
          } else {
            throw new Error(response.statusText);
          }
        }
      )

    return true;
  }

  logout() {
    this.http.post(properties.endpoint + '/users/logout', null, { observe: 'response'})
    .subscribe((response: any) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        location.reload();
      }
    })
  }
}
