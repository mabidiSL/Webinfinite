import { createAction, props } from '@ngrx/store';
import { User } from './auth.models';

// Register action
export const Register = createAction('[Authentication] Register', props<{ email: string, username: string, password: string }>());
export const RegisterSuccess = createAction('[Authentication] Register Success', props<{ user: User }>());
export const RegisterFailure = createAction('[Authentication] Register Failure', props<{ error: string }>());

// login action
export const login = createAction('[Authentication] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Authentication] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Authentication] Login Failure', props<{ error: any }>());
 
// update password
export const updatePassword = createAction('[Authentication] UpdatePassword', props<{  password: string }>());
export const updatePasswordSuccess = createAction('[Authentication] UpdatePassword Success', props<{ user: User }>());
export const updatePasswordFailure = createAction('[Authentication] UpdatePassword Failure', props<{ error: string }>());

// logout action
export const logout = createAction('[Authentication] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');


