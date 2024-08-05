import { Component } from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  profilePicUrl: string | null = null;

  constructor(protected session: UserSessionService) { }
}
