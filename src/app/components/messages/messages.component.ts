import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserModule } from '../../modules/user.module';
import {NgForOf, NgIf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";
import {UserSessionService} from "../../services/user-session.service";
import {UserFetcherService} from "../../services/user-fetcher.service";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    NgIf,
    UserCardComponent,
    NgForOf,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy {
  users: UserModule[] = [];
  avatarUrl: string[] = [];

  constructor(
    private session: UserSessionService,
    private fetcher: UserFetcherService,
  ) {
  }

  ngOnInit() {
    this.session.userObs.subscribe(x => {
      if (x === 'ok') {
        const url = this.session.user._links.connections;
        if (!url) return;

        this.fetcher.connections(url.href).subscribe({
          next: (res: any) => {
            console.log(res.body);

            this.users = res.body._embedded.userList;
            this.getAvatars();
          }
        })
      }
    })
  }

  ngOnDestroy() {
    this.avatarUrl.forEach((url) => {
      URL.revokeObjectURL(url);
    })
  }

  getAvatars() {
    this.users.forEach(user => {
      const url = user._links.avatar;
      if (!url) return;

      this.fetcher.avatar(url.href).subscribe({
        next: (res: any) => {
          this.avatarUrl[user.id] = URL.createObjectURL(res.body);
        }
      })
    })
  }
}
