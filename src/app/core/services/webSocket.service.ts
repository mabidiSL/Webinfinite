import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { _User } from 'src/app/store/Authentication/auth.models';
const SOCKET_SERVER_URL = 'https://legislative-eveleen-infiniteee-d57d0fbe.koyeb.app/'; // Your Socket.IO server URL
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private currentUserSubject: BehaviorSubject<_User>;
  public currentUser: Observable<_User>;
  private messagesSubject = new BehaviorSubject<{ userId: string; message: string }[]>([]);
  messages$ = this.messagesSubject.asObservable();
  

  constructor() {
    this.currentUserSubject = new BehaviorSubject<_User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.socket = io(SOCKET_SERVER_URL);
    // Register with userId = 1 after connecting to the socket
    this.socket.on('connect', () => {
      const userId = this.currentUserSubject.value.id; // Hard-coded user ID
      this.registerUser(userId);
      console.log(`User registered: ${userId}`);
    });
    this.listenForMessages();
  }
  private listenForMessages() {
    this.socket.on('messageFromServer', (message: { userId: string; message: string }) => {
      console.log({ message });
      this.messagesSubject.next([...this.messagesSubject.value, message]);
    });
  }
  private registerUser(userId: string) {
    this.socket.emit('registerUser', userId);
  }
  sendMessage(message: string) {
    const messageData = { userId: '1', message }; // Send messages as userId = 1
    this.socket.emit('messageFromClient', messageData);
  }
}