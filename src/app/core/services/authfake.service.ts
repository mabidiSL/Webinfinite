import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/store/Authentication/auth.models';
//import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    login(email: string, password: string) {
       
        //return this.http.post<any>(`${environment.baseURL}/login`, { email, password }/*,{ headers: headers }*/)
        return this.http.post<any>('/api/login', { email, password }/*,{ headers: headers }*/)

        //return this.http.post<any>(`/users/authenticate`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }
    forgotPassword(email: string){
        return this.http.post('/api/forgot-password',{email}) ;
    }
    updateProfilePassword(currentPassword: string, newPassword: string){
        const id = this.currentUserSubject.value.userId;
         return this.http.post(`/api/${id}/password`,{currentPassword,newPassword})
        .pipe(map(message => {
            console.log(message)
            return message;
        }));
    }
    updatePassword(password: string, token: string){

        return this.http.post(`/api/reset-password/${token}`,{password})
       .pipe(map(message => {
           console.log(message)
           return message;
       }));
   }
    updateProfile(user: any){
        return this.http.put('/api/user',user) .pipe(map(user => {
            // update Profile successful 
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                
            }
            return user;
        }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
