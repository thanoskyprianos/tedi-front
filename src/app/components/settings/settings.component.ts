import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})

export class SettingsComponent {
  @Input() newEmail: string = '';
  @Input() newPassword: string = '';

  constructor(protected session: UserSessionService){}

  onSubmitSettings()
  {

    const SettingsUpd = {
      nemail: this.newEmail,
      npassword: this.newPassword
    };

    let UrlEmail = this.session.user._links.email;
    let UrlPassword = this.session.user._links.password;

    if (this.newEmail.trim() !== '' && this.newPassword.trim() !== '')
    {
      //this.session.updateSettings( , SettingsUpd);
    }

    if (this.newEmail.trim() !== '')
    {
      //this.session.updateEmail(UrlEmail, this.newEmail);
    }

    if (this.newPassword.trim() !== '')
    {
      //this.session.updatePassword(UrlPassword, this.newPassword);
    }

  }
}
