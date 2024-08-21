import {Component, OnInit} from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {UserFetcherService} from "../../services/user-fetcher.service";
import {ProfileData, UserModule} from "../../modules/user.module";
import {NgIf} from "@angular/common";
import {PostsComponent} from "../posts/posts.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, NgIf, PostsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{
  aboutMe: ProfileData = new ProfileData (
    'Software Engineer',
    null,
    '5 years in software development',
    'Computer Science',
    'JavaScript, TypeScript, Angular'
  )
  avatarUrl: string = 'https://randomuser.me/api/portraits/lego/1.jpg';

  user: UserModule | undefined;
  connected: boolean | undefined;

  constructor(
    protected session: UserSessionService,
    private fetcher: UserFetcherService,
    private router: Router
  ) {
    const id
      = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));

    this.session.userObs.subscribe((x) => {
      if (x === 'ok') {
        if (id === this.session.user.id) {
          this.user = this.session.user;
          this.setDetails(this.user);
        } else {
          this.fetcher.userById(id).subscribe({
            next: (res: any) => {
              this.user = res.body as UserModule;
              this.setDetails(this.user);
            },
            error: (err: any) => { this.router.navigate(['/error']); }
          })
        }
      }
    })
  }

  // mainly used to reload if user clicks on their profile
  // while being on a different one
  ngOnInit() {
    this.router.events.subscribe((x) => {
      if (x instanceof NavigationEnd) {
        location.reload();
      }
    })
  }

  setDetails(user: UserModule) {
    this.getAboutMe(user);
    this.getAvatar(user);
  }

  getAboutMe(user: UserModule) {
    const infoUrl = user._links.info;
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

  getAvatar(user: UserModule) {
    const avatarUrl = user._links.avatar;
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

  addFriend() {

  }

  removeFriend() {

  }
}
