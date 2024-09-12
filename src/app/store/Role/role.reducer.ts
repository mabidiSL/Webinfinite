import { createReducer, on } from '@ngrx/store';
import { Register, RegisterFailure, RegisterSuccess, login, loginFailure, loginSuccess, logout, logoutSuccess, updateProfile, updateProfileFailure, updateProfileSuccess } from './role.actions';
import { _User } from './role.models';

export interface AuthenticationState {
    isLoggedIn: boolean;
    user: _User | null;
    token: string |null;
    error: string | null;
}

const initialState: AuthenticationState = {
    isLoggedIn: false,
    user: null,
    token: null,
    error: null,
};

export const authenticationReducer = createReducer(
    initialState,
    on(Register, (state) => ({ ...state, error: null })),
    on(RegisterSuccess, (state, { user }) => ({ ...state, isLoggedIn: true, user, error: null, })),
    on(RegisterFailure, (state, { error }) => ({ ...state, error })),

    on(login, (state) => ({ ...state, error: null })),
    on(loginSuccess, (state, { user, token }) => ({ ...state, isLoggedIn: true, user,token, error: null, })),
    on(loginFailure, (state, { error }) => ({ ...state, error })),
    on(logout, (state) => ({ ...state, user: null, token: null, error: null })),
    on(logoutSuccess, (state, { user, token }) => ({ ...state, user, token, isLoggedIn: false, error: null })),
    
    on(updateProfile, (state) => ({ ...state, error: null })),
    on(updateProfileSuccess, (state, { user }) => ({ ...state, user, error: null })),
    on(updateProfileFailure, (state, { error }) => ({ ...state, error }))

);
