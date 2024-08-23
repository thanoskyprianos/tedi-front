import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserSessionService } from '../../services/user-session.service';
import {UserUpdaterService} from "../../services/user-updater.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})

export class SettingsComponent {
  @Input() email: string = '';

  @Input() password: string = '';
  @Input() retypePassword : string = '';

  message: string | null = null;

  constructor(
    protected session: UserSessionService,
    private updater: UserUpdaterService,
    private router: Router
  ) { }

  updateEmail(event: any) {
    if (!this.email) {
      this.showMessage('Please, fill out all input fields');
      return;
    }

    if (this.email === this.session.user.email) {
      this.showMessage('Please, give a different email');
      return;
    }

    this.updater.updateEmail(
      this.session.user._links.email.href,
      this.email.trim()
    ).subscribe({
      next: (res: any) => {
        this.session.logout().subscribe(() => {
          this.router.navigate(['']);
        });
      },
      error: (err: any) => {
        if (err.status === 409 && err.error.message) {
          this.showMessage(err.error.message);
        }
      }
    })

    event.target.reset();
  }

  updatePassword(event: any) {
    if (!this.password || !this.retypePassword) {
      this.showMessage('Please, fill out all input fields');
      return;
    }

    if (this.password !== this.retypePassword) {
      this.showMessage('Passwords do not match');
      event.target.reset();
      return;
    }

    this.updater.updatePassword(
      this.session.user._links.password.href,
      this.password.trim()
    ).subscribe({
      next: (res: any) => {
        this.showMessage('Password changed successfully');
      }
    })

    event.target.reset();
  }

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => this.message = null, 2000);
  }
}
