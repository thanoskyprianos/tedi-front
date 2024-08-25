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

  errorMsg: string | null = null;

  constructor(
    private session: UserSessionService,
    private router: Router
  ) {
  }

  onSubmit() {
    if (!(this.email && this.password)) {
      this.errorIndication('Please, fill out all input fields')
      return;
    }

    this.session.login(this.email.trim(), this.password.trim()).subscribe({
      next: (res: any) => {
        this.session.setToken(res.body.tokens.accessToken, res.body.tokens.refreshToken);
        this.session.setUser(res.body);
        this.session.subj.next('ok');

        this.router.navigate(['/home-page']);
      },
      error: (err) => {
        this.errorIndication(err.error.message);
        document.forms[0].reset();
      }
    });
  }

  private errorIndication(errorMsg: string) {
    this.errorMsg = errorMsg;
    setTimeout(() => this.errorMsg = null, 2000);
  }
}
