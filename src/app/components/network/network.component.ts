import { Component } from '@angular/core';
import {UserModule} from "../../modules/user.module";
import {UserSessionService} from "../../services/user-session.service";
import {UserFetcherService} from "../../services/user-fetcher.service";
import {NgForOf} from "@angular/common";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css'
})
export class NetworkComponent {
  user!: UserModule;
  displayUser!: UserModule;
  connectedWithMe: any[] = [];
  avatarUrl: string = '';

  constructor(
    protected session: UserSessionService,
    private fetcher: UserFetcherService,
    private router: Router) {

    this.session.userObs.subscribe((x) => {
      if (x === 'ok')
      this.user = this.session.user;
      this.getAllConnectedUsers(this.user);
    })

  }

  getAllConnectedUsers(user: UserModule) {
    const connectedUrl = user._links.connections;
    if (connectedUrl) {
      this.fetcher.connections(connectedUrl.href).subscribe(
        (res: any) => {
          if (res.status === 200 && res.body) {
            console.log('Response body:', res.body);
            this.connectionsSet(res.body)
          } else {
            console.log('No connections yet');
          }
        }
      )
    }
  }

  connectionsSet(info: any) {
    this.connectedWithMe = info._embedded.userList as UserModule[];
  }

  goToUser(event: any, userId: number) {
    const selectedUser: NavigationExtras = {
      state: {
        data: this.user
      }
    };

    this.router.navigate(['/profile-page', userId], selectedUser);
  }

  setAvatar() {
    this.fetcher.avatar(this.user!._links.avatar.href).subscribe({
      next: (res) => {
        if (!res.body) return;
        this.avatarUrl = URL.createObjectURL(res.body);
      }
    })
  }

}
