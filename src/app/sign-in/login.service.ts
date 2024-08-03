import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAuthService} from "../user/user-auth.service";
import {Router} from "@angular/router";
import {UserModule} from "../user/user.module";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private userAuth: UserAuthService,
    private router: Router
  ) {
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      return;
    }

    this.http.post("http://localhost:8080/users/login", {
      email: email,
      password: password
    }, {observe: 'response'})
      .subscribe((res: any) => {
        if (res.status === 200) {
          console.log(res.body);

          let userBody = res.body.user;

          this.userAuth.isLoggedIn = true;
          this.userAuth.saveToken(res.body.jwt);
          this.userAuth.saveUserId(userBody.id);

          let user = {
            firstName: userBody.firstName,
            lastName: userBody.lastName,
            email: userBody.email,
            phoneNumber: userBody.phoneNumber,
            links: userBody._links
          } as UserModule;

          this.userAuth.saveUser(user);

          this.router.navigate(['/home-page']);
        }
      }
    )
  }
}
