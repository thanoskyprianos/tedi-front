import { Component } from '@angular/core';
import { MessagesService} from "../../services/messages.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  message: string = '';

  constructor(private messageService: MessagesService) {}

  ngOnInit() {

  }

  onSendMessage() {
    if (this.message.trim()) {
      this.messageService.sendMessage(this.message);
    }
  }
}
