import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserSessionService} from "../../services/user-session.service";

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

  constructor(private session: UserSessionService) {
  }

  onSubmit() {
    if (this.email && this.password) {
      this.session.login(this.email, this.password)
    }
  }
}
