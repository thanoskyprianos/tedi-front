import {Component, OnInit} from '@angular/core';
import {UserFetcherService} from "../../../services/user-fetcher.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserModule} from "../../../modules/user.module";
import {NgForOf, NgIf} from "@angular/common";
import {MessageModule} from "../../../modules/message.module";
import {MessagingService} from "../../../services/messaging.service";
import {FormsModule} from "@angular/forms";
import {MessageComponent} from "./message/message.component";

@Component({
  selector: 'app-user-messages',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    MessageComponent,
    RouterLink
  ],
  templateUrl: './user-messages.component.html',
  styleUrl: './user-messages.component.css'
})
export class UserMessagesComponent implements OnInit {
  user!: UserModule;
  messages: MessageModule[] = [];
  message: string = '';

  constructor(
    private fetcher: UserFetcherService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messaging: MessagingService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fetcher.userById(params['id']).subscribe({
        next: (res: any) => {
          this.user = res.body as UserModule;

          this.fetcher.messages(this.user.id).subscribe({
            next: (res: any) => {
              this.messages = res.body as MessageModule[];
              this.messages.reverse();
            }
          })

          this.messaging.disconnect(); // disconnect previous socket
          this.messaging.connect();

          this.messaging.receive().subscribe({
            next: (res: any) => {
              const message = JSON.parse(res.body) as MessageModule;

              if (message.sender.id === this.user.id
                || message.recipient.id === this.user.id) {
                this.messages.unshift(message);
              }
            }
          })
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    })
  }

  sendMessage(event: any) {
    if (!this.message) return;

    const message = {
      message: this.message,
      recipient: this.user.id
    }

    this.messaging.send(this.user.id, message);

    event.target.reset();
  }
}
