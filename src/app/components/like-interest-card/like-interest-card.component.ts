import {Component, ElementRef, Input} from '@angular/core';
import {ActivityModule} from "../../modules/activity.module";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-like-interest-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './like-interest-card.component.html',
  styleUrl: './like-interest-card.component.css'
})
export class LikeInterestCardComponent {
  @Input() activity!: ActivityModule;

  constructor(
    private notificationService: NotificationService,
    private host: ElementRef
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
}
