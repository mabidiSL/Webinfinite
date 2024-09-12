import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './role.reducer';

export const getLayoutState = createFeatureSelector<AuthenticationState>('auth');

export const getUser = createSelector(
    getLayoutState,
    (state: AuthenticationState) => state.user
);

export const selectUserToken = createSelector(
    getLayoutState,
    (state: AuthenticationState) => state.token
  );
export const getisLoggedIn = createSelector(
    getLayoutState,
    (state: AuthenticationState) => state.isLoggedIn
);

export const getError = createSelector(
    getLayoutState,
    (state: AuthenticationState) => state.error
);