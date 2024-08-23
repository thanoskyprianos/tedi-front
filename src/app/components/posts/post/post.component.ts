import {Component, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PostModule} from "../../../modules/post.module";
import {NgForOf, NgIf} from "@angular/common";
import {PostService} from "../../../services/post.service";
import {UserModule} from "../../../modules/user.module";
import {UserFetcherService} from "../../../services/user-fetcher.service";
import {NavigationExtras, Router} from "@angular/router";
import {UserSessionService} from "../../../services/user-session.service";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnChanges {
  @Input() post: PostModule | undefined;
  user: UserModule | undefined;

  media: {url: string, type: string}[] = [];
  avatarUrl: string = '';
  overflown: boolean = false;

  constructor(
    private host: ElementRef,
    protected session: UserSessionService,
    private postService: PostService,
    private fetcher: UserFetcherService,
    private router: Router
    ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'].firstChange && this.post) {
      this.getUser();
      this.getMedia();
    }
  }

  getMedia() {
    const mediaUrls: any | any[] | undefined = this.post!._links.media;

    if (mediaUrls === undefined) { return; }

    if (mediaUrls instanceof Array)
      for (const link of mediaUrls) {
        this.getFile(link.href)
      }
    else
      this.getFile(mediaUrls.href);
  }

  getUser() {
    this.fetcher.userByUrl(this.post!._links.author.href).subscribe({
      next: (res: any) => {
        this.user = res.body as UserModule;
        this.setAvatar();
      }
    });
  }

  setAvatar() {
    this.fetcher.avatar(this.user!._links.avatar.href).subscribe({
      next: (res) => {
        if (!res.body) return;

        const reader = new FileReader();

        reader.onloadend = (event) => {
          if (event.target && typeof event.target.result === "string") {
            this.avatarUrl = event.target.result;
          }
        }

        reader.readAsDataURL(res.body);
      }
    })
  }

  getFile(url: any) {
    this.postService.getMedia(url).subscribe({
      next: (res) => {
        if (!res.body) return;
        this.displayMedia(res.body);
      }
    })
  }

  displayMedia(file: Blob) {
    const reader = new FileReader();

    reader.onloadend = (event) => {
      if (event.target && typeof event.target.result === "string") {
        this.media.push({url: event.target.result, type: file.type});
      }
    }

    reader.readAsDataURL(file);
  }

  viewImage(event: any) {
    const w = window.open("", "_blank");
    if (!w) { return; }

    w.document.title = 'Image';
    w.document.write(`
        <body style="
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            background-color: #1c1c1e"
        >
          <img style="height: 100vh" src="${event.target.src}" alt="image"/>
        </body>
    `);

    // causes firefox to not load without timeout
    setTimeout(() => {w.stop()}, 0);
  }

  scrollBack(event: any) {
    this.scrollMedia(-1);
  }

  scrollFront(event: any) {
    this.scrollMedia(1);
  }

  scrollMedia(sign: -1 | 1) {
    const mediaWrapper = document.querySelector(`.media-wrapper.id${this.post!.id}`);
    if (!mediaWrapper) { return; }

    mediaWrapper.scroll({
      left: mediaWrapper.scrollLeft + 250 * sign,
      behavior: 'smooth'
    })
  }

  checkOverflow() {
    const wrapper: any = document.querySelector('.media-wrapper.id' + this.post!.id);
    if (!wrapper) { return; }
    this.overflown = wrapper.offsetWidth < wrapper.scrollWidth;
  }

  goToUser(event: any) {
    const selectedUser: NavigationExtras = {
      state: {
        data: this.user
      }
    };

    this.router.navigate(['/profile-page', this.user!.id], selectedUser);
  }

  deletePost() {
    this.postService.deletePost(this.post!._links.delete.href).subscribe({
      next: (res) => {
        this.host.nativeElement.remove();
      },
      error: (err: any) => {console.error(err)}
    })
  }
}
