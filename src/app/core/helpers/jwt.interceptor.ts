import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserToken } from 'src/app/store/Authentication/authentication-selector';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private store: Store    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
       
        //     console.log('i am on jwt token');
        //     // add authorization header with jwt token if available
        //     const currentUser = this.authfackservice.currentUserValue;
        //     //console.log(currentUser.token);
        //     if (currentUser && currentUser.token) {
        //         console.log(currentUser.token);
        //         request = request.clone({
        //             setHeaders: {
        //                 'x-auth-token': `${currentUser.token}`,
        //             },
        //         });
        //     }
        //     else{
        //         console.log('i am in the login first time');
        //     }
       
        // return next.handle(request);
        return this.store.select(selectUserToken).pipe(
            switchMap(token => {
                if (token) {
                    console.log('Token retrieved from state:', token);
                    request = request.clone({
                        setHeaders: {
                            'x-auth-token': token,
                        },
                    });
                } else {
                    console.log('No token available in state');
                }
                return next.handle(request);
            })
        );
    }
}
