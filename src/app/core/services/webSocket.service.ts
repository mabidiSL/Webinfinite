// socket.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private url: string = 'https://legislative-eveleen-infiniteee-d57d0fbe.koyeb.app/'; // Update to your WebSocket URL
  public notifications$ = new BehaviorSubject<{ userId: string; message: string }[]>([]);

  constructor() {
    this.socket = io(this.url);

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  

    this.socket.on('messageFromServer', (message) => {
      console.log('i am in socket messages', message);
      if (typeof message === 'object' && message !== null)
        { 
          console.log(message);
          this.notifications$.next([...this.notifications$.value, message]); 
        } 
        else
         {
       this.notifications$.next([...this.notifications$.value, { userId: 'Server', message }]);
       } 
    });
   


    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
  });
  }
  public registerUser(userId: string){
    if(userId && this.socket){
      this.socket.emit('registerUser', userId);
      console.log(`User registered: ${userId}`);
    }
     else {
    console.warn('User ID is not defined or socket is not initialized');
   }
  }
 
  public sendMessage(message: any): void {
    console.log('i am in sendMessage');
    this.socket.emit('messageFromClient', message);
  }

  public getMessages() {
    console.log('i am in getmessages');
    return this.notifications$.asObservable();
  }

  public connectAndRegister(userId: string) {
    return new Promise<void>((resolve, reject) => {
      this.socket.connect();

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        this.registerUser(userId);
        resolve(); // Resolve the promise once the user is registered
      });

      this.socket.on('error', (error) => {
        console.error('Socket connection error:', error);
        reject(error); // Reject the promise if there's an error
      });
    });
  }
}
