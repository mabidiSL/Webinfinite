// import { Injectable, Inject } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { map, switchMap, catchError, exhaustMap, tap, first } from 'rxjs/operators';
// import { BehaviorSubject, from, Observable, of } from 'rxjs';
// import { AuthenticationService } from '../../core/services/auth.service';
// import { login, loginSuccess, loginFailure,forgetPassword, logout, logoutSuccess, Register, RegisterSuccess, RegisterFailure, updatePassword, updatePasswordFailure, updatePasswordSuccess, updateProfile, updateProfilePassword, updateProfileSuccess, updateProfileFailure, updateProfilePasswordSuccess, updateProfilePasswordFailure } from './role.actions';
// import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
// import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
// import { UserProfileService } from 'src/app/core/services/user.service';
// import { ToastrService } from 'ngx-toastr';
// import { _User, User } from './role.models';

// @Injectable()
// export class AuthenticationEffects {
  
//   private currentUserSubject: BehaviorSubject<_User>;
//   public currentUser: Observable<_User>;

//   constructor(
//     @Inject(Actions) private actions$: Actions,
//     private AuthenticationService: AuthenticationService,
//     private AuthfakeService: AuthfakeauthenticationService,
//     private userService: UserProfileService,
//     private router: Router,
//     public toastr:ToastrService) {

//       this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
//       this.currentUser = this.currentUserSubject.asObservable();
//      }
          
//   public get currentUserValue(): User {
//       return this.currentUserSubject.value;
//   }

//   Register$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(Register),
//       exhaustMap(({ email, username, password }) => {
//         if (environment.defaultauth === 'fakebackend') {
//           return this.userService.register({ email, username, password }).pipe(
//             map((user) => {
//               this.router.navigate(['/auth/login']);
//               return RegisterSuccess({ user })
//             }),
//             catchError((error) => of(RegisterFailure({ error })))
//           );
//         } else {
//           return this.AuthenticationService.register({ email, username, password }).pipe(
//             map((user) => {
//               this.router.navigate(['/auth/login']);
//               return RegisterSuccess({ user })
//             })
//           )
//         }
//       })
//     )
//   );



//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(login),
//       exhaustMap(({ email, password }) => {
//         console.log('before zero looping');

//           return this.AuthfakeService.login(email, password).pipe(
//             map((user) => {
//               if (user) {
              
//                 console.log(JSON.stringify(user.user));
//                 localStorage.setItem('currentUser', JSON.stringify(user.user));
//                 localStorage.setItem('token', user.token);
//                 this.currentUserSubject.next(user);
//                 this.toastr.success('Login successfully!!!');
//                 this.router.navigate(['/']);
//                 return loginSuccess({ user: user.user, token: user.token });

//               }
//               return loginFailure({ error:'Login failed' });
//             }),
//             catchError((error) => {
//               this.toastr.error(`Login failed: ${error.message}`);
//               return of(loginFailure({ error }))})); // Closing parenthesis added here
            
        
//       })
//     )
//   );
 
//   forgetPassword$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(forgetPassword),
//       exhaustMap((action) => {
//         return this.AuthfakeService.forgotPassword(action.email).pipe(
//           map((response: any) => {
//             this.toastr.success('An Email was sent check your inbox');
//             return { type: '[Auth] Forgot Password Success', payload: response };
//           }),
//           catchError((error: any) => {
//             this.toastr.error(`Forgot Password Failure: ${error.message}`);
//             return of({ type: '[Auth] Forgot Password Failure', payload: error });
//           }),
//           tap(() => {
//             // Navigate to another route after successful response
//             this.router.navigate(['auth/login']); // or any other route you want
//           }),
//         );
//       }),
//     ));
//   updatePassword$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(updatePassword),
//       exhaustMap(({ password, token }) => {
//         return this.AuthfakeService.updatePassword(password, token).pipe(
//           map((response: any) => {
//             this.toastr.success('Password has been updated successfully!!!');
//             return { type: '[Auth] Update Password Success', payload: response };
//           }),
//           catchError((error: any) => {
//             this.toastr.error(`Update Password Failure: ${error.message}`);
//             return of({ type: '[Auth] Update Password Failure', payload: error });
//           }),
//           tap(() => {
//             // Navigate to another route after successful response
//             this.router.navigate(['auth/login']); // or any other route you want
//           }),
//         );
//       }),
//     ));
//   updateProfile$ = createEffect(()=>
//     this.actions$.pipe(
//     ofType(updateProfile),
//     exhaustMap((user : any ) => {
//       return this.AuthfakeService.updateProfile(user).pipe(
//         map((response: any) => {
//           if (response) {
//             localStorage.setItem('currentUser', JSON.stringify(response));
//             this.toastr.success('The profile was updated successfully.');
//             this.router.navigate(['/dashboard']);
//             return updateProfileSuccess({user:response});
//           }
         
//         }),
//         catchError((error: any) => {
//           this.toastr.error(`Update Profile Failure: ${error.message}`);
//           return of(updateProfileFailure({ error }));
//         }),
       
//       );
//     }),
//   ));
     
//   updateProfilePassword$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(updateProfilePassword),
//       exhaustMap(({ id,currentPassword, newPassword}) => {
//         return this.AuthfakeService.updateProfilePassword(id, currentPassword, newPassword).pipe(
//           map((response: any) => {
//             if (response) {
             
//               this.toastr.success('The password was updated successfully.');
//               this.router.navigate(['/dashboard']);
//               return updateProfilePasswordSuccess({message:response});
//             }
            
//           }),
//           catchError((error: any) => {
            
//             this.toastr.error(`Update Password Failure: ${error.message}`);
//             return of(updateProfilePasswordFailure({error:error}));
//           }),
         
//         );
//       }),
//     ));

//   logout$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(logout),
//       tap(() => {
//         // Perform any necessary cleanup or side effects before logging out
       
//         localStorage.removeItem('currentUser');
//         localStorage.removeItem('token');
//         this.currentUserSubject.next(null);
//         this.router.navigate(['/auth/login']);
//         this.toastr.success('You are logged out !!!');
//       }),
//       exhaustMap(() => of(logoutSuccess({user: null, token: null})))
//     )
//   );



// }