import { Component, OnInit } from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import { RouterModule } from '@angular/router';
import {UserFetcherService} from "../../services/user-fetcher.service";
import {ProfileData} from "../../modules/user.module";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  aboutMe: ProfileData = new ProfileData (
    'Software Engineer',
    null,
    '5 years in software development',
    'Computer Science',
    'JavaScript, TypeScript, Angular'
  )
  avatarUrl: string = 'https://randomuser.me/api/portraits/lego/1.jpg';

  constructor(
    protected session: UserSessionService,
    private fetcher: UserFetcherService
  ) {
    this.session.userObs.subscribe((x) => {
      if (x == 'ok') {
        this.getAvatar();
        this.getAboutMe();
      }
    })
  }

  getAboutMe() {
    const infoUrl = this.session.user._links.info;
    if (infoUrl) {
      this.fetcher.aboutMe(infoUrl.href).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.aboutMeSet(res.body)
          }
        }
      )
    }
  }

  aboutMeSet(info: any) {
    this.aboutMe.professionalPosition = info.professionalPosition;
    this.aboutMe.employmentAgency = info.employmentAgency;
    this.aboutMe.experience = info.experience;
    this.aboutMe.education = info.education;
    this.aboutMe.skills = info.skills;
  }

  getAvatar() {
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

  refreshPage(): void {
    window.location.reload();
  }
}
