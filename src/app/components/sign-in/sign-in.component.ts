import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserSessionService} from "../../services/user-session.service";
import {Router} from "@angular/router";

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

  constructor(
    private session: UserSessionService,
    private router: Router
  ) {
  }

  onSubmit() {
    if (this.email && this.password) {
      this.session.login(this.email, this.password).subscribe(
        (res: any) => {
          console.log(res.body)

          this.session.setToken(res.body.token);
          this.session.setUser(res.body);

          this.router.navigate(['/home-page']);
        }
      )
    }
  }
}
