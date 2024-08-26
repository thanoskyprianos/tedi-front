import {Component, Input} from '@angular/core';
import { MessagesService} from "../../services/messages.service";
import { UserModule } from '../../modules/user.module';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  user: UserModule | undefined;
  message: string = '';
  @Input() userName: string = '';
  @Input() lastName: string = '';

  get fullName(): string {
    return `${this.userName} ${this.lastName}`;
  }

  constructor(private messageService: MessagesService) {}

  onSendMessage() {

    if (this.message.trim()) {
      this.messageService.sendMessage(this.message);
    }

  }

}
