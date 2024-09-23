import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../../core/services/token-storage.service';
import { Observable } from 'rxjs';

// const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'x-auth-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: any) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    this.token = localStorage.getItem('token');

    if (this.checkTokenExpiration()) {
      const refreshToken = localStorage.getItem('refreshToken');
      this.token = localStorage.setItem('refreshToken',refreshToken);
      const currentTime = new Date().getTime();
      localStorage.setItem('timeLifeToken',currentTime.toString());
   
      
    }
    if (this.token) {
          // Clone the request and add the token to the headers
          const cloned  = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`,
            },
        });
          return next.handle(cloned);
      } else {
          // No token, continue with the original request
          return next.handle(request);
      }
    
  }
  checkTokenExpiration(): boolean {
    const tokenIssuedAt = localStorage.getItem('timeLifeToken');
    
    if (tokenIssuedAt) {
      const tokenIssuedTime = parseInt(tokenIssuedAt, 10); // Get the time when the token was issued
      const currentTime = new Date().getTime(); // Get the current time
      const tokenValidDuration = 3600000; // 1 hour in milliseconds
  
      // Check if current time exceeds the issue time plus the token duration
      if ((currentTime - tokenIssuedTime) > tokenValidDuration) {
        return true; // Token is expired
      }
    }
    return false; // Token is not expired
  }
  
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];