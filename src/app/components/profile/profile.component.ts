import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {UserFetcherService} from "../../services/user-fetcher.service";
import {ProfileData, UserModule} from "../../modules/user.module";
import {NgIf} from "@angular/common";
import {PostsComponent} from "../posts/posts.component";
import {AvatarInputComponent} from "../avatar-input/avatar-input.component";
import {UserUpdaterService} from "../../services/user-updater.service";
import {CardType} from "../user-card/user-card.component";
import {ConnectionService} from "../../services/connection.service";
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, NgIf, PostsComponent, AvatarInputComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit, OnDestroy {
  aboutMe: ProfileData = new ProfileData (
    null,
    null,
    null,
    null,
    null
  )

  @Input() selectedFile: File | null = null;
  avatarUrl: string = '';

  user!: UserModule;
  type!: CardType | undefined;

  constructor(
    protected session: UserSessionService,
    private fetcher: UserFetcherService,
    private updater: UserUpdaterService,
    private router: Router,
    private connection: ConnectionService,
    private messages: MessagesService
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

              const acceptUrl = this.user._links.accept;
              const addUrl = this.user._links.add;
              const cancelUrl = this.user._links.cancel;
              const removeUrl = this.user._links.remove;

              this.type = acceptUrl ?
                CardType.REQUEST : addUrl ?
                  CardType.ADD : cancelUrl?
                    CardType.CANCEL : removeUrl ?
                      CardType.REMOVE : undefined;
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
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.avatarUrl) {
      URL.revokeObjectURL(this.avatarUrl);
    }
  }

  updateAvatar() {
    if (!this.selectedFile) { return; }

    this.updater.uploadImage(
      this.session.user._links.avatar.href,
      this.selectedFile
    ).subscribe();
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
            this.selectedFile = res.body;
            this.avatarSet(res.body);
          }
        }
      );
    }
  }

  avatarSet(file: Blob) {
    this.avatarUrl = URL.createObjectURL(file);
  }

  addFriend() {
    const url = this.user._links.add;
    if (!url) return;

    this.connection.add(url.href).subscribe({
      next: (res) => {
        this.type = CardType.CANCEL;
        location.reload();
      },
      error: (err: any) => {
        console.log(err)
        location.reload();
      }
    })
  }

  removeFriend() {
    const url = this.user._links.remove;
    if (!url) return;

    this.connection.cancel(url.href).subscribe({
      next: (res) => {
        this.type = CardType.ADD;
        location.reload();
      },
      error: (err: any) => {
        console.log(err)
        location.reload();
      }
    })
  }

  accept() {
    const url = this.user._links.accept;
    if (!url) return;

    this.connection.accept(url.href).subscribe({
      next: (res) => {
        this.type = CardType.REMOVE;
        location.reload();
      },
      error: (err: any) => {
        console.log(err)
        location.reload();
      }
    })
  }

  reject() {
    const url = this.user._links.reject;
    if (!url) return;

    this.connection.reject(url.href).subscribe({
      next: (res) => {
        this.type = CardType.ADD;
        location.reload();
      },
      error: (err: any) => {
        console.log(err)
        location.reload();
      }
    })
  }

  cancel() {
    const url = this.user._links.cancel;
    if (!url) return;

    this.connection.cancel(url.href).subscribe({
      next: (res) => {
        this.type = CardType.ADD;
        location.reload();
      },
      error: (err: any) => {
        console.log(err)
        location.reload();
      }
    })
  }

  messageFriend(myUserId: number, friendUserId: number) {
    this.messages.ConnectToSocket('wss://localhost:8080/ws');
    this.messages.openChatRoom(myUserId, friendUserId);
  }

  protected readonly CardType = CardType;
}
