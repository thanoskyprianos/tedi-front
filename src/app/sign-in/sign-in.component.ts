import {Component} from '@angular/core';
import {UserAuthService} from "../user-auth.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {
  constructor(private userAuthService: UserAuthService) {

  }

  login() {
    this.userAuthService.isLoggedIn = true;
  }
}
