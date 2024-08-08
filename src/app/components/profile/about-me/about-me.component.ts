import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { UserSessionService} from "../../../services/user-session.service";

// @ts-ignore
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})

export class AboutMeComponent {
  aboutMeText: string = '';
  profileText: string = '';

  constructor(private session: UserSessionService) { }

  onSubmit() {
    let aboutMe = this.session.user._links[2];
  }

}
