import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import {
  selectAuth,
  selectErrorMessage,
} from 'src/app/store/auth/auth.selectors';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  // private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  public auth$ = this.store.select(selectErrorMessage);

  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public errorMessage: string = '';

  login(): void {
    const { username, password } = this.loginForm.value;
    this.store.dispatch(
      AuthActions['[Auth]RequestLogin']({ username, password })
    );
    // this.authService.signIn(username, password).subscribe({
    //   next: ()=>this.router.navigateByUrl('/todo'),
    //   error: (err) => {
    //     this.errorMessage = err?.error?.message
    //   }
    // }
    // )
  }
}
