import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/auth/interfaces/user.interface';

export const selectAuth = createFeatureSelector<Readonly<UserState>>('auth');

export const selectErrorMessage = createSelector(
  selectAuth,
  (state: UserState) => state.errorMessage
);
