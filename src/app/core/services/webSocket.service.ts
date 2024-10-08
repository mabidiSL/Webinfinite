import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;
  private notificationSubject = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect() {
    // Replace with your WebSocket server URL
    this.socket = new WebSocket('ws://https://legislative-eveleen-infiniteee-d57d0fbe.koyeb.app/');

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.notificationSubject.next(message);
    };

    this.socket.onclose = () => {
      // Handle socket close
      console.log('WebSocket closed. Reconnecting...');
      setTimeout(() => this.connect(), 1000); // Reconnect after 1 second
    };
  }

  get notifications$() {
    return this.notificationSubject.asObservable();
  }
}
