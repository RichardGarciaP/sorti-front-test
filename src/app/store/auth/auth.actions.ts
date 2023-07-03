import { createActionGroup, props } from '@ngrx/store';
import { UserState } from 'src/app/auth/interfaces/user.interface';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    '[Auth] Request Login': props<{ username: string; password: string }>(),
    '[Auth] Login Success': props<UserState>(),
    '[Auth] Logout': props,
    '[Auth] Login Failed': props<{ errorMessage: string }>(),
  },
});
