import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../../core/services/token-storage.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { Router } from '@angular/router';

// const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'x-auth-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: any, private router: Router, private authService: AuthfakeauthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip token checks for login or refresh token URLs
    if (request.url.includes('/auth/login') || request.url.includes('/auth/refresh')) {
        return next.handle(request);
    }

    this.token = localStorage.getItem('token');
    
    if (this.checkTokenExpiration()) {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
            return this.authService.refreshToken(refreshToken).pipe(
                switchMap((newTokens: any) => {
                    localStorage.setItem('token', newTokens.accessToken);
                    localStorage.setItem('refreshToken', newTokens.refreshToken);

                    const currentTime = new Date().getTime();
                    localStorage.setItem('timeLifeToken', currentTime.toString());

                    const cloned = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${newTokens.accessToken}`,
                        },
                    });
                    return next.handle(cloned);
                }),
                catchError((error) => {
                    this.handleRefreshTokenFailure();
                    return throwError(error);
                })
            );
        } else {
            this.handleRefreshTokenFailure();
        }
    }

    if (this.token) {
        const cloned = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        return next.handle(cloned);
    } else {
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



// Handle refresh token failure (log out the user or redirect to login)
private handleRefreshTokenFailure(): void {
  // Clear tokens and redirect to login
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('timeLifeToken');

  this.router.navigate(['/auth/login']);
}
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];