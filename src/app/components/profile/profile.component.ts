import { Component } from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  profilePicUrl: string | null = null;

  constructor(protected session: UserSessionService) { }

  refreshPage(): void {
    window.location.reload();
  }
}
