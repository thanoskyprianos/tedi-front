import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavBarComponent, NgIf, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(protected router: Router) {
  }

  shouldActivateNavBar() {
    switch (this.router.url) {
      case '/sign-in': case '/sign-up': case '/': return false;
      default: return true;
    }
  }
}
