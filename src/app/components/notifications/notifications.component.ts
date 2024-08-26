import {Component, OnInit} from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import {UserModule} from "../../modules/user.module";
import {UserFetcherService} from "../../services/user-fetcher.service";
import {NgForOf, NgIf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgIf,
    UserCardComponent,
    NgForOf
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  requests: UserModule[] = [];

  constructor(
    private session: UserSessionService,
    private fetcher: UserFetcherService,
  ) {
  }

  ngOnInit() {
    this.session.userObs.subscribe(x => {
      if (x === 'ok') {
        console.log('test')

        const receivedRequests = this.session.user._links.received;
        console.log('received requests', receivedRequests);

        if (!receivedRequests) return;

        this.fetcher.getReceived(receivedRequests.href).subscribe({
          next: (res: any) => {
            res.body._embedded.connectionNotificationList.forEach((notification: any) => {
              this.fetcher.userByUrl(notification._links.sender.href).subscribe({
                next: (res: any) => {
                  this.requests.push(res.body as UserModule);
                },
                error: (err: any) => { console.error(err); }
              })
            });
          },
          error: (err: any) => { console.log(err) }
        })
      }
    })
  }
}
