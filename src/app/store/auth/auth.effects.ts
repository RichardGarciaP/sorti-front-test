import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthActions } from './auth.actions';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const login = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions['[Auth]RequestLogin']),
      exhaustMap((action) =>
        authService.signIn(action.username, action.password).pipe(
          map((response) =>
            AuthActions['[Auth]LoginSuccess']({
              user: response.data.user,
              token: response.token,
            })
          ),
          catchError((error) => {
            return of(
              AuthActions['[Auth]LoginFailed']({
                errorMessage: error.error.message,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);
