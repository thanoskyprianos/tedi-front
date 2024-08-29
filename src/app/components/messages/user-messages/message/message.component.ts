import {Component, Input} from '@angular/core';
import {MessageModule} from "../../../../modules/message.module";
import {NgIf, NgStyle} from "@angular/common";
import {UserModule} from "../../../../modules/user.module";
import {UserSessionService} from "../../../../services/user-session.service";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() message!: MessageModule;
  user!: UserModule;

  constructor(
    private session: UserSessionService
  ) {
    this.session.userObs.subscribe({
      next: (x) => {
        if (x === 'ok') {
          this.user = this.session.user;
        }
      }
    })
  }
}
