import { Component } from '@angular/core';
import { MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  message: string = '';

  constructor(private messageService: MessagesService) {}

  onSendMessage() {
    if (this.message.trim()) {
      this.messageService.sendMessage(this.message);
    }
  }
}
