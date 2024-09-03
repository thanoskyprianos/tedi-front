import {Component, OnInit} from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import {UserModule} from "../../modules/user.module";
import {UserFetcherService} from "../../services/user-fetcher.service";
import {NgForOf, NgIf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";
import {ActivityModule} from "../../modules/activity.module";
import {LikeInterestCardComponent} from "../like-interest-card/like-interest-card.component";
import {CommentCardComponent} from "../comment-card/comment-card.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgIf,
    UserCardComponent,
    NgForOf,
    LikeInterestCardComponent,
    CommentCardComponent
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  requests: UserModule[] = [];
  like_interests: ActivityModule[] = [];
  comments: ActivityModule[] = [];


  constructor(
    private session: UserSessionService,
    private fetcher: UserFetcherService,
  ) {
  }

  ngOnInit() {
    this.session.userObs.subscribe(x => {
      if (x === 'ok') {
        const receivedRequests = this.session.user._links.received;
        if (receivedRequests) {
          this.getRequests(receivedRequests);
        }

        const likeActivitiesUrl = this.session.user._links.like_activity;
        if (likeActivitiesUrl) {
          this.getLikes(likeActivitiesUrl);
        }

        const commentActivitiesUrl = this.session.user._links.comment_activity;
        if (commentActivitiesUrl) {
          this.getComments(commentActivitiesUrl);
        }

        const interestActivitiesUrl = this.session.user._links.interest_activity;
        if (interestActivitiesUrl) {
          this.getInterests(interestActivitiesUrl);
        }
      }
    })
  }

  getRequests(url: any) {
    this.fetcher.getReceived(url.href).subscribe({
      next: (res: any) => {
        try {
          res.body._embedded.connectionNotificationList.forEach((notification: any) => {
            this.fetcher.userByUrl(notification._links.sender.href).subscribe({
              next: (res: any) => {
                this.requests.push(res.body as UserModule);
              },
              error: (err: any) => {
                console.error(err);
              }
            })
          });
        } catch (e) { }
      },
      error: (err: any) => { console.log(err) }
    })
  }

  getLikes(url: any) {
    this.fetcher.getReceived(url.href).subscribe({
      next: (res: any) => {
        try {
          res.body._embedded.likeNotificationList.forEach((notification: any) => {
            this.like_interests.push(notification as ActivityModule);
          });
        } catch (e) { }
      }
    })
  }

  getInterests(url: any) {
    this.fetcher.getReceived(url.href).subscribe({
      next: (res: any) => {
        try {
          res.body._embedded.interestNotificationList.forEach((notification: any) => {
            this.like_interests.push(notification as ActivityModule);
          });
        } catch (e) { }
      }
    })
  }

  getComments(url: any) {
    this.fetcher.getReceived(url.href).subscribe({
      next: (res: any) => {
        try {
          res.body._embedded.commentNotificationList.forEach((notification: any) => {
            this.comments.push(notification as ActivityModule);
          });
        } catch (e) { }
      }
    })
  }
}
