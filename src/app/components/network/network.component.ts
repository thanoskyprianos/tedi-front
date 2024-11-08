import {Component, Input} from '@angular/core';
import {ProfileData, UserModule} from "../../modules/user.module";
import {UserSessionService} from "../../services/user-session.service";
import {UserFetcherService} from "../../services/user-fetcher.service";
import {NgForOf, NgIf} from "@angular/common";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css'
})

export class NetworkComponent {
  user!: UserModule;
  connectedWithMe: any[] = [];
  avatarUrl: string = '';
  avatarUrls: string[] = [];
  aboutMeData: { [userId: number]: ProfileData } = {};

  aboutMe: ProfileData = new ProfileData (
    null,
    null,
    null,
    null,
    null
  )

  @Input() selectedFile: File | null = null;

  constructor(
    protected session: UserSessionService,
    private fetcher: UserFetcherService,
    private router: Router) {

    this.session.userObs.subscribe((x) => {
      if (x === 'ok') {
        this.user = this.session.user;
        this.getAllConnectedUsers(this.user);
      }
    })

  }

  getAllConnectedUsers(user: UserModule) {
    const connectedUrl = user._links.connections;
    if (connectedUrl) {
      this.fetcher.connections(connectedUrl.href).subscribe(
        (res: any) => {
          if (res.status === 200 && res.body) {
            this.connectionsSet(res.body)
          }
        }
      )
    }
  }

  connectionsSet(info: any) {
    try {
      this.connectedWithMe = info._embedded.userList as UserModule[];
      this.connectedWithMe.sort((a, b) => a.firstName.localeCompare(b.firstName));

      this.connectedWithMe.forEach(user => {
        this.getAboutMe(user);
        this.setAvatar(user, user.id);
      });
    } catch (e) { }
  }

  goToUser(event: any, userId: number) {
    const selectedUser: NavigationExtras = {
      state: {
        data: this.user
      }
    };

    this.router.navigate(['/profile-page', userId], selectedUser);
  }

  getAboutMe(user: UserModule) {
    const infoUrl = user._links.info;
    if (infoUrl) {
      this.fetcher.aboutMe(infoUrl.href).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.aboutMeSet(user.id, res.body);
          }
        }
      )
    }
  }

  aboutMeSet(userId: number, info: any) {
    this.aboutMeData[userId] = new ProfileData(
      info.professionalPosition,
      info.employmentAgency,
      info.experience,
      info.education,
      info.skills
    );
  }

  setAvatar(user: UserModule, userId: number) {
    const avatarUrl = user._links.avatar?.href;
    this.fetcher.avatar(avatarUrl).subscribe({
      next: (res) => {
        if (!res.body) return;

        this.avatarUrls[userId] = URL.createObjectURL(res.body);
      }
    })
  }

  clickToSearch() {
    this.router.navigate(['/search']);
  }
}
