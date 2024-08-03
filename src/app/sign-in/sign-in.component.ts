import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {
  @Input() email: string = '';
  @Input() password: string = '';

  constructor(private loginService: LoginService) {

  }

  onSubmit() {
    this.loginService.login(this.email, this.password);
  }
}
