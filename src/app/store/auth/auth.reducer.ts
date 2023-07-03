import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/auth/interfaces/user.interface';
import { AuthActions } from './auth.actions';

export const initialState: Readonly<UserState> = {
  loading: false,
  user: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions['[Auth]RequestLogin'], (state) => {
    return { ...state, loading: true };
  }),
  on(AuthActions['[Auth]LoginSuccess'], (state, payload) => {
    return { ...state, user: payload.user, token: payload.token };
  }),
  on(AuthActions['[Auth]Logout'], (state) => {
    return { ...state };
  }),
  on(AuthActions['[Auth]LoginFailed'], (state, payload) => {
    return { ...state, loading: false, errorMessage: payload.errorMessage };
  })
);
