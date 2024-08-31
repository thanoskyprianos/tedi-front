import {Component, ElementRef, Input} from '@angular/core';
import {ActivityModule} from "../../modules/activity.module";
import {NgIf} from "@angular/common";
import {NotificationService} from "../../services/notification.service";
import {Router, RouterLink} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent {
  @Input() activity!: ActivityModule;

  constructor(
    private notificationService: NotificationService,
    private host: ElementRef,
    private router: Router,
    private postService: PostService,
  ) {
  }

  readNotification() {
    const readUrl = this.activity._links.read;
    const unreadUrl = this.activity._links.unread;

    const url = readUrl ? readUrl : unreadUrl;
    if (!url) return;

    this.notificationService.readNotification(url.href).subscribe({
      next: (res) => {
        this.activity.read = !this.activity.read;
      }
    })
  }

  deleteNotification() {
    const deleteUrl = this.activity._links.delete;
    if (!deleteUrl) return;

    this.notificationService.deleteNotification(deleteUrl.href).subscribe({
      next: (res) => {
        this.host.nativeElement.remove();
      }
    })
  }

  gotoPost() {
    const url = this.activity._links.post;
    if (!url) return;

    this.postService.getPostByUrl(url.href).subscribe({
      next: (res: any) => {
        const id = res.body.id;
        if (!id) return;

        this.router.navigate([`/post/${this.activity.receiver.id}/${id}`]);
      }
    })
  }
}
