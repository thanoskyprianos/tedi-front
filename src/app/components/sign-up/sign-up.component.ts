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
  showSuccessMessage: boolean = false;

  constructor(
    private session: UserSessionService,
    private router: Router
  ) { }

  onSubmit() {
    if (!(
      this.email &&
      this.password &&
      this.firstName &&
      this.lastName &&
      this.confirmPassword &&
      this.phoneNumber
    )) {
      this.errorIndication('Please, fill out all input fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorIndication('Passwords do not match');
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
            this.showSuccess();
            this.router.navigate(['/home-page']);
          });
        } else {
          this.showSuccess();
          this.router.navigate(['/home-page']);
        }
      },
      error: err => { if (err.status === 409) this.errorIndication(err.error.message); }
    }).add(() => document.forms[0].reset()); // reset form on duplicate email
  }

  private errorIndication(errorMsg: string) {
    this.errorMsg = errorMsg;
    setTimeout(() => this.errorMsg = null, 2000);
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

  showSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 2000);
  }

  avatarClear() {
    const avatarDisplay = document.querySelector("#avatar-display");

    if (avatarDisplay) {
      avatarDisplay.setAttribute('src', 'resource/user.png');
      this.selectedFile = null;
    }
  }
}
