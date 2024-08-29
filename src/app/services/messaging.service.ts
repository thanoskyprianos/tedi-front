import { Injectable } from '@angular/core';
import {UserSessionService} from "./user-session.service";
import {Client} from "@stomp/stompjs";
import {RxStomp} from "@stomp/rx-stomp";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  public rxStomp!: RxStomp;

  constructor(
    private session: UserSessionService
  ) {
  }

  connect() {
    this.rxStomp = new RxStomp();
    this.rxStomp.configure({
      brokerURL: 'wss://localhost:8080/room',
      connectHeaders: {
        Authorization: 'Bearer ' + this.session.accessToken
      },
      beforeConnect: () => {console.log("Connected to chat")}
    });

    this.rxStomp.activate();
  }

  disconnect() {
    if (this.rxStomp) {
      this.rxStomp.deactivate().then(() => console.log("Disconnected from chat"));
    }
  }

  send(toUserId: number, message: any) {
    this.rxStomp.publish({destination: '/app/message', body: JSON.stringify(message)});
  }

  receive() {
    return this.rxStomp.watch({destination: '/user/queue'})
  }
}
