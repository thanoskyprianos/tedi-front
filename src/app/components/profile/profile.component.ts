import { Component } from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import { RouterModule } from '@angular/router';
import {UserFetcherService} from "../../services/user-fetcher.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  avatarUrl!: string;

  constructor(
    protected session: UserSessionService,
    private fetcher: UserFetcherService
  ) {
    this.session.userObs.subscribe((x) => {
      if (x == 'ok') {
        const avatarUrl = this.session.user.links.find(
          (element) => element.rel === 'avatar');

        if (avatarUrl) {
          this.fetcher.avatar(avatarUrl.href).subscribe(
            (res: any) => {
              if (res.status === 200) {
                this.avatarSet(res.body);
              }
            }
          );
        }
      }
    })
  }

  stringSaveAboutMe() : void 
  {
    this.userFetcher.aboutMe();
  }

  refreshPage(): void {
    window.location.reload();
  }

  avatarSet(file: Blob) {
    const reader = new FileReader();
    const avatarDisplay = document.querySelector(".profile-pic");

    if (avatarDisplay) {
      reader.onloadend = (event) => {
        if (event.target && typeof event.target.result === "string") {
          this.avatarUrl = event.target.result;
        }
      }

      reader.readAsDataURL(file);
    }
  }
}
