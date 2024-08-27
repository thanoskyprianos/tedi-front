import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  private socket: WebSocket | undefined;
  private userId1: number | undefined;
  private userId2: number | undefined;

  constructor() { }

  ConnectToSocket(url: string): void {

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('Connection opened');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  
    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

  }

  async openChatRoom(userId1: number, userId2: number): Promise<void> {

    /* When opening/creating a chat room the senders' and receivers' id
     * are being stored.
     */
    this.userId1 = userId1;
    this.userId2 = userId2;

    /* Tries to obtain the chatroom between two users,
     * if not exists a new one gets created.
     */
    const userChatResponse = await fetch(`/messages/${userId1}/${userId2}`);
    if (!userChatResponse.ok) {
      throw new Error('Error occured in opening chat');
    }

    // display chat room messages
    const messages = await userChatResponse.json();

  }

  sendMessage(message: string): void {

    if (this.socket &&
      this.socket.readyState === WebSocket.OPEN)
    {

      // Chat room & message information
      const MessageToBeSent = {
        senderId: this.userId1,
        receiverId: this.userId2,
        content: message
      };

      const CompleteMess = JSON.stringify(MessageToBeSent);
      this.socket.send(CompleteMess);

    } else {
      console.error('WebSocket not open at the moment');
    }

  }

}
