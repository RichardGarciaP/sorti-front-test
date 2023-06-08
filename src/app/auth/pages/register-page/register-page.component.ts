import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private coreServices = inject(CoreService);
  public errorMessage:string = '';


  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })


  register() {
    this.errorMessage = ''
    const {username, password} = this.loginForm.value;
    console.log(username, password)
    if(!username || !password) {
      this.errorMessage = 'El usuario y la contraseña son necesarios';
      return;    
    }

    this.authService.signUp(username, password).subscribe({
      next: (res)  =>  {
        this.coreServices.openSnackBar('Usuario Creado')
        this.router.navigateByUrl('/auth/login')
      },
      error: (err)=> {
        this.errorMessage = err.error.message;
        // this.coreServices.openSnackBar(err.error?.message)
      }
    })
  }
}
