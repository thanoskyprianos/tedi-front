import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserSessionService} from "../../services/user-session.service";

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
  @Input() phoneNumber: number = 0;
  selectedFile: File | null = null;

  constructor(private session: UserSessionService) { }

  onSubmit() {

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.selectedFile) {
        this.session.signup(this.email, this.password, this.firstName, this.lastName, this.confirmPassword, this.phoneNumber);
    } else {
      this.session.signup(this.email, this.password, this.firstName, this.lastName, this.confirmPassword, this.phoneNumber);
    }

    let avatarUrl = this.session.user._links[1];
    if (this.selectedFile)
    {
      this.session.uploadImage(avatarUrl, this.selectedFile);
    }

  }

}
