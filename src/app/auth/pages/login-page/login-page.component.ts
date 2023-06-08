import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  
  private fb = inject(FormBuilder);
  private authService = inject( AuthService );
  private router = inject( Router );

  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })
  public errorMessage:string = '';


  login():void {
    const {username, password} = this.loginForm.value;

    this.authService.signIn(username, password).subscribe({
      next: ()=>this.router.navigateByUrl('/todo'),
      error: (err) => {
        this.errorMessage = err?.error?.message
      }
    }
    )
  }
}
