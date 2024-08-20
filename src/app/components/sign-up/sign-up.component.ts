import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserSessionService} from "../../services/user-session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() confirmPassword: string = '';
  @Input() phoneNumber: string = '';

  selectedFile: File | null = null;
  errorMsg: string | null = null;

  constructor(
    private session: UserSessionService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      setTimeout(() => this.errorMsg = null, 2000);
      return;
    }

    this.session.register(
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.phoneNumber
    ).subscribe({
      next: (res: any) => {
        this.session.setToken(res.body.token);
        this.session.setUser(res.body);
        this.session.subj.next('ok');

        let avatarUrl = this.session.user._links.avatar;

        if (this.selectedFile) {
          this.session.uploadImage(avatarUrl.href, this.selectedFile).subscribe(() => {
            this.router.navigate(['/home-page']);
          });
        } else {
          this.router.navigate(['/home-page']);
        }
      },
      error: err => {
        if (err.status === 409) {
          this.errorMsg = err.error.message;
          setTimeout(() => this.errorMsg = null, 2000);
        }
      }
    }).add(() => document.forms[0].reset());
  }

  avatarSet(event: any) {
    const reader = new FileReader();
    const avatarDisplay = document.querySelector("#avatar-display");

    if (avatarDisplay) {
      reader.onloadend = (event) => {
        if (event.target && typeof event.target.result === "string") {
          avatarDisplay.setAttribute('src', event.target.result);
        }
      }

      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    }
  }

  avatarClear() {
    const avatarDisplay = document.querySelector("#avatar-display");

    if (avatarDisplay) {
      avatarDisplay.setAttribute('src', 'resource/user.png');
      this.selectedFile = null;
    }
  }
}
