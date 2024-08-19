import { Component, OnInit } from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import { RouterModule } from '@angular/router';
import {UserFetcherService} from "../../services/user-fetcher.service";

interface ProfileData {
  professionalPosition: string | null;
  employmentAgency: string | null;
  experience: string | null;
  education: string | null;
  skills: string | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  professionalPosition: string | null = null;
  employmentAgency: string | null = null;
  experience: string | null = null;
  education: string | null = null;
  skills: string | null = null;
  avatarUrl!: string;

  constructor(
    protected session: UserSessionService,
    private fetcher: UserFetcherService
  ) {
    this.session.userObs.subscribe((x) => {
      if (x == 'ok') {
        const avatarUrl = this.session.user._links.avatar;

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

  ngOnInit(): void {
    this.GetAboutMe();
  }

  GetAboutMe() : void
  {
    const infoURL = this.session.user._links.href;
    this.fetcher.aboutMe(infoURL)
    .subscribe(res => {
      const profileData = res.body as ProfileData;
      this.professionalPosition = profileData.professionalPosition;
      this.employmentAgency = profileData.employmentAgency;
      this.experience = profileData.experience;
      this.education = profileData.education;
      this.skills = profileData.skills;
    });
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
