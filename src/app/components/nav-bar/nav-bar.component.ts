import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserSessionService} from "../../services/user-session.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(protected session: UserSessionService) {
  }
}
