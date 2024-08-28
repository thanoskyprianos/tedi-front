import {Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {CommentModule} from "../../../../modules/comment.module";
import {NgIf} from "@angular/common";
import {UserModule} from "../../../../modules/user.module";
import {UserFetcherService} from "../../../../services/user-fetcher.service";
import {PostService} from "../../../../services/post.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnChanges, OnDestroy {
  @Input() comment!: CommentModule;
  author!: UserModule;
  avatarUrl: string = '';

  constructor(
    private fetcher: UserFetcherService,
    private postService: PostService,
    private host: ElementRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comment'].firstChange && this.comment) {
      const userUrl = this.comment._links.author;
      if (!userUrl) return;

      this.fetcher.userByUrl(userUrl.href).subscribe({
        next: (res: any) => {
          this.author = res.body as UserModule;
          this.getAvatar();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.avatarUrl);
  }

  getAvatar(): void {
    if (!this.author) return;

    const avatarUrl = this.author._links.avatar;

    this.fetcher.avatar(avatarUrl.href).subscribe({
      next: (res: any) => {
        this.avatarUrl = URL.createObjectURL(res.body);
      }
    })
  }

  deleteComment() {
    const url = this.comment._links.delete;
    if (!url) return;

    this.postService.deleteComment(url.href).subscribe({
      next: (res: any) => {
        this.host.nativeElement.remove();
      },
      error: (err: any) => {
        location.reload();
      }
    })
  }
}
