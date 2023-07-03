import { ActionReducerMap } from '@ngrx/store';
import { UserState } from '../auth/interfaces/user.interface';
import { authReducer } from './auth/auth.reducer';

export interface AppState {
  auth: Readonly<UserState>;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducer,
};
