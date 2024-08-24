import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-message-by-user',
  standalone: true,
  imports: [],
  templateUrl: './message-by-user.component.html',
  styleUrl: './message-by-user.component.css'
})
export class MessageByUserComponent {
  id: number = 0;

  constructor(private router: Router) {
    this.id = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  }
}
